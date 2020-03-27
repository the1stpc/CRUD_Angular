import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {UsersService} from '../shared/services/user.service';
import {Observable} from 'rxjs';
import {IFilter, IUser, IUserFilter} from '../shared/interfaces';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserFormComponent} from './user-form/user-form.component';
import {EAgeType, EGender} from '../shared/enums';
import {ToastService} from '../shared/services/toast.service';


@Component({
  selector: 'app-crud-page',
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.styl']
})
export class CrudPageComponent implements OnInit {
  @ViewChild(UserFormComponent) userForm
  users$: Observable<IUser[]>;
  throwUser: IUser
  modal
  page = 1;
  pageSize = 5;
  filterList: IUserFilter = {
    age: {
      value: undefined, filter: (value, item) => {
        const userAge = (Date.now() - Date.parse(item.birthday)) / 86400000 / 365;
        return value == null || (value === EAgeType.CHILD ? userAge < 18 : userAge > 18);
      }
    },
    mailing: {value: undefined, filter: (value, item) => value == null || (item.mailing === value)},
    gender: {value: undefined, filter: (value, item) => value == null || (item.gender === value)}
  }
  eGender = EGender;
  eAgeType = EAgeType;


  constructor(private UserService: UsersService, private modalService: NgbModal, private toastService: ToastService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  // tslint:disable-next-line:variable-name
  deleteUser(_id: string) {
    const decision = window.confirm(`Точно удалить пользоветеля?`);
    if (decision) {
      this.UserService.delete(_id)
        .subscribe(
          response => this.toastService.show(response.message, {classname: 'bg-success text-light', delay: 10000}),
          error => this.toastService.show(error.error.message, {classname: 'bg-danger text-light', delay: 10000}),
          () => this.users$ = this.UserService.fetch()
        );
    }
  }

  changeUser(content: TemplateRef<any>, user: IUser) {
    this.throwUser = user
    this.modal = this.modalService.open(content, {size: 'xl', ariaLabelledBy: 'modal-basic-title'});
  }

  getUsers() {
    this.users$ = this.UserService.fetch();
  }


  closeModal() {
    this.getUsers();
    this.modal.close();
  }

  filterAge = (user: IUser) => {
    return Object.values(this.filterList).every(item => item.filter(item.value, user));
  }

  get closeModalFunc() {
    return this.closeModal.bind(this);
  }
}




