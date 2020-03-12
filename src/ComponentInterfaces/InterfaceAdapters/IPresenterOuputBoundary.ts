import IResponseModel from '../UseCase/IResponseModel';
// import IView from './IView';

export default interface IPresenterOuputBoundary {
  // constructor(view: IView): void;

  presente(responseModel: IResponseModel): void;
}
