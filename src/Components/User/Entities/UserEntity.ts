import IEntity from '../../../ComponentInterfaces/Entity/IEntity';

export default class UserEntity implements IEntity {
  id?: any;
  email: string;
  password: string;

  constructor(email: string, password: string, id?: string) {
    this.id = id ? id : undefined;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  checkPassword(passwordToCheck: string) {
    return this.password === passwordToCheck;
  }
}
