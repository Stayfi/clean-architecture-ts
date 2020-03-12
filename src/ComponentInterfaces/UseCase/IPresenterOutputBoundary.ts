// import IView from './IView';
import IResponseModel from './IResponseModel';

export default interface IPresenterOutputBoundary {
  // constructor(view: IView): void;

  presente(responseModel: IResponseModel): void;
}
