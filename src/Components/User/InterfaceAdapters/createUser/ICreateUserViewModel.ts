import IViewModel from '../../../../ComponentInterfaces/InterfaceAdapters/IViewModel';

export default interface ICreateUserViewModel extends IViewModel {
  userCreated: boolean;
  id?: string;
  email: string;
  errors?: Array<string>;
}
