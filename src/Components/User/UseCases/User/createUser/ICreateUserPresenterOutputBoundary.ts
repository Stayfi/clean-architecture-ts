// import ICreateUserView from './ICreateUserView';
import IPresenterOuputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import ICreateUserResponseModel from './ICreateUserResponseModel';

export default interface ICreateUserPresenterOutputBoundary
  extends IPresenterOuputBoundary {
  // constructor(view: ICreateUserView): void;

  presente(createUserResponseModel: ICreateUserResponseModel): void;
}
