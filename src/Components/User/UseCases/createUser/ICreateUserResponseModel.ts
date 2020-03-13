import IResponseModel from '../../../../ComponentInterfaces/UseCase/IResponseModel';

export default interface ICreateUserResponseModel extends IResponseModel {
  id?: string;
  email: string;
}
