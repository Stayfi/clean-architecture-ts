import IRequestModel from './IRequestModel';
// import IPresenterOuputBoundary from '../InterfaceAdapters/IPresenterOuputBoundary';
// import IEntityGateway from './IEntityGateway';

export default interface IInteractor {
  //  constructor(entityRepository: IEntityGateway, presenter: IPresenterOuputBoundary): void;

  execute(requestModel: IRequestModel): void;
}
