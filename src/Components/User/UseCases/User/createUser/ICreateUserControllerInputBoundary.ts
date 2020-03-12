import CreateUserRequestModelType from './ICreateUserRequestModel';
import IControllerInputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IControllerInputBoundary';
/*
import ICreateUserEntityGateway from './ICreateUserEntityGateway';
import ICreateUserView from '../../InterfaceAdapters/ICreateUserView';
*/

export default interface ICreateUserControllerInputBoundary
  extends IControllerInputBoundary {
  /*
    constructor(
      createUserEntityRepository: ICreateUserEntityGateway,
      createUserView: ICreateUserView
    ): void;
  */

  execute(createUserRequestModelType: CreateUserRequestModelType): void;
}
