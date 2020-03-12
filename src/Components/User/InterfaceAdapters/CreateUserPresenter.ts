import ICreateUserPresenterOutputBoundary from '../UseCases/User/createUser/ICreateUserPresenterOutputBoundary';
import ICreateUserView from './ICreateUserView';
import ICreateUserResponseModel from '../UseCases/User/createUser/ICreateUserResponseModel';
import ICreateUserViewModel from './ICreateUserViewModel';
import CreateUserViewModelMapper from './CreateUserViewModelMapper';

export default class CreateUserPresenter
  implements ICreateUserPresenterOutputBoundary {
  private createUserView: ICreateUserView;

  constructor(createUserView: ICreateUserView) {
    this.createUserView = createUserView;
  }

  presente(createUserResponseModel: ICreateUserResponseModel): void {
    const createUserViewModel: ICreateUserViewModel =
      CreateUserViewModelMapper.mapFromCreateUserResponseModel(
        createUserResponseModel
      );
    if (!createUserViewModel.id) {
      createUserViewModel.errors = [];
      createUserViewModel.errors.push('CreateUserPresenter.id.undefined');
    }
    this.createUserView.render(createUserViewModel);
  }
}
