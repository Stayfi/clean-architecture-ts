// import IView from './IView';
// import IEntityGateway from '../UseCase/IEntityGateway';
import IControllerRequestModel from './IControllerRequestModel';

export default interface IControllerInputBoundary {
  //  constructor(view: IView, entityRepository: IEntityGateway): void;

  execute(request: IControllerRequestModel): void;
}
