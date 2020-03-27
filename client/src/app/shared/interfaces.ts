import {EAgeType, EGender} from './enums';

export interface IUser {
  email: string;
  firstName: string;
  phone: string;
  birthday: string;
  gender: string;
  mailing: boolean;
  imageSrc?: File;
  _id?: string;
}

export interface IMessage {
  message: string;
}

export interface IFilter<T, I extends {} = {}> {
  value?: T;
  filter: (value: T, item: I) => boolean;
}

export interface IUserFilter {
  age: IFilter<EAgeType, IUser>;
  mailing: IFilter<boolean, IUser>;
  gender: IFilter<EGender, IUser>;
}
