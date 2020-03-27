import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/user.service';
import {EGender} from '../../shared/enums';
import {IUser} from '../../shared/interfaces';
import {ToastService} from '../../shared/services/toast.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.styl']
})

export class UserFormComponent implements OnInit {
  @Input() closeModal: Function;
  @Input() throwUser: IUser
  @ViewChild('input', {static: true}) inputRef: ElementRef
  keys = Object.keys;
  userForm: FormGroup;
  submitted = false;
  image: File
  imagePreview: any = ''
  genders = EGender
  user: IUser
  now = moment(Date.now()).format('YYYY-MM-DD')
  userFormTitle
  regMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]

  constructor(private formBuilder: FormBuilder, private UserService: UsersService, public toastService: ToastService) {
  }


  ngOnInit() {
    this.userFormTitle = this.throwUser ? 'Редактировать ' : 'Создать '
    this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern(this.regMail)]],
        gender: ['', Validators.required],
        firstName: ['', Validators.required],
        phone: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        mailing: [true]
      }
    );

    if (this.throwUser) {
      Object.keys(this.f).forEach(key => {
        this.f[key].patchValue(this.throwUser[key]);
      })
      this.imagePreview = this.throwUser.imageSrc;
    }
  }

  onSubmit() {
    let obs$
    if (this.userForm.invalid) {
      this.submitted = true;
      return;
    }
    obs$ = this.throwUser ? this.UserService.update(this.userForm.value, this.image, this.throwUser._id) : this.UserService.create(this.userForm.value, this.image)

    obs$.subscribe(
      user => {
        this.user = user
        this.submitted = false
        this.userForm.reset();
        this.f.mailing.patchValue(true)
        this.imagePreview = '';
        this.toastService.show(`Пользователь ${this.throwUser ? 'изменен' : 'создан'}`, {
          classname: 'bg-success text-light',
          delay: 10000
        });
        if (this.throwUser) {
          this.closeModal();
        }
      },
      error => {
        this.toastService.show(error.error.message, {classname: 'bg-danger text-light', delay: 10000});
      }
    );
  }

  onReset() {
    this.userForm.reset();
    this.imagePreview = '';
    this.throwUser ? this.closeModal() : this.submitted = false;
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }


  get f() {
    return this.userForm.controls;
  }


}
