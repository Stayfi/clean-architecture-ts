import IRequestModel from '../../../../ComponentInterfaces/UseCase/IRequestModel';

export default interface ICreateUserRequestModel extends IRequestModel {
  email: string;
  password: string;
}
