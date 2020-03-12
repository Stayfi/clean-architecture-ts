import ICreateUserRequestModel from '../UseCases/User/createUser/ICreateUserRequestModel';
import CreateUserControllerRequest from './ICreateUserControllerRequest';
import ICreateUserEntityGateway from '../UseCases/User/createUser/ICreateUserEntityGateway';
import CreateUserInteractor from '../UseCases/User/createUser/CreateUserInteractor';
import ICreateUserView from './ICreateUserView';
import CreateUserPresenter from './CreateUserPresenter';

export default class CreateUserController {
  private createUserEntityRepository: ICreateUserEntityGateway;
  private createUserPresenter: CreateUserPresenter;

  constructor(
    createUserEntityRepository: ICreateUserEntityGateway,
    createUserView: ICreateUserView
  ) {
    this.createUserEntityRepository = createUserEntityRepository;
    this.createUserPresenter = new CreateUserPresenter(createUserView);
  }

  async execute(
    createUserControllerRequest: CreateUserControllerRequest
  ): Promise<void> {
    await this.getCreateUserInteractor().execute(
      this.getCreateUserRequestModelFromRequest(createUserControllerRequest)
    );
  }

  private getCreateUserInteractor(): CreateUserInteractor {
    const createUserInteractor: CreateUserInteractor = new CreateUserInteractor(
      this.createUserEntityRepository,
      this.createUserPresenter
    );
    return createUserInteractor;
  }

  private getCreateUserRequestModelFromRequest(
    createUserControllerRequest: CreateUserControllerRequest
  ): ICreateUserRequestModel {
    const createUserRequestModel: ICreateUserRequestModel = {
      email: createUserControllerRequest.email,
      password: createUserControllerRequest.password
    };
    return createUserRequestModel;
  }
}
