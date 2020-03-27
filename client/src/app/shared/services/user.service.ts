import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMessage, IUser} from '../interfaces';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) {

  }

  fetch(): Observable<IUser[]> {
    return this.http.get<IUser[]>('/api/users');
  }


  create(form: IUser, imageSrc: File, id?): Observable<IUser> {
    const fd = new FormData();

    if (imageSrc) {
      fd.append('image', imageSrc, imageSrc.name);
    }

    Object.entries(form).forEach(item => {
      fd.append(item[0], item[1]);
    })
    return this.http.post<IUser>('/api/users', fd);
  }


  update(form: IUser, imageSrc: File, id?): Observable<IUser> {
    const fd = new FormData();

    if (imageSrc) {
      fd.append('image', imageSrc, imageSrc.name);
    }
    Object.entries(form).forEach(item => {
      fd.append(item[0], item[1]);
    });
    return this.http.patch<IUser>(`/api/users/${id}`, fd);
  }

  delete(id: string): Observable<IMessage> {
    return this.http.delete<IMessage>(`/api/users/${id}`);
  }


}
