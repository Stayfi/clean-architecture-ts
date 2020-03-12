import IControllerRequestModel from '../../../ComponentInterfaces/InterfaceAdapters/IControllerRequestModel';

export default interface CreateUserControllerRequestModel
  extends IControllerRequestModel {
  email: string;
  password: string;
}
