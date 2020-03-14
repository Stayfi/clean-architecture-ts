import ICreateUserRequestModel from './ICreateUserRequestModel';
import ICreateUserPresenterOutputBoundary from './ICreateUserPresenterOutputBoundary';
import ICreateUserEntityGateway from './ICreateUserEntityGateway';
import ICreateUserResponseModel from './ICreateUserResponseModel';
import UserEntity from '../../Entities/UserEntity';
import ICreateUserControllerInputBoundary from './ICreateUserControllerInputBoundary';

export default class CreateUserInteractor
  implements ICreateUserControllerInputBoundary {
  private userEntity: UserEntity | undefined;
  private entityRepository: ICreateUserEntityGateway;
  private presenter: ICreateUserPresenterOutputBoundary;

  constructor(
    entityRepository: ICreateUserEntityGateway,
    presenter: ICreateUserPresenterOutputBoundary
  ) {
    this.entityRepository = entityRepository;
    this.presenter = presenter;
  }

  async execute(requestModel: ICreateUserRequestModel) {
    this.userEntity = new UserEntity(requestModel.email, requestModel.password);
    await this.validateRequestModel(requestModel);
    let newUserEntitySaved;

    try {
      newUserEntitySaved = await this.entityRepository.create(this.userEntity);
    } catch (error) {
      throw new Error('CreateUserInteractor.repository.create.error');
    }

    // tslint:disable-next-line: max-line-length
    const createUserResponse: ICreateUserResponseModel = this.getCreateUserResponseModelFromUser(
      newUserEntitySaved
    );
    this.presenter.presente(createUserResponse);
  }

  private async validateRequestModel(requestModel: ICreateUserRequestModel) {
    if (!requestModel.email && !requestModel.password) {
      throw new Error('CreateUserInteractor.email_and_password.empty');
    } else if (!requestModel.email) {
      throw new Error('CreateUserInteractor.email.empty');
    } else if (!requestModel.password) {
      throw new Error('CreateUserInteractor.password.empty');
    }
    const userEmail: string = await this.userEntity!.getEmail();
    const isUserExist: boolean = await this.checkNewUserExist(userEmail);
    if (isUserExist) {
      throw new Error('CreateUserInteractor.newuser.exist');
    }
  }

  private async checkNewUserExist(email: string): Promise<boolean> {
    try {
      const isUserExist = await this.entityRepository.findByEmail(email);
      return !!isUserExist;
    } catch (error) {
      return false;
    }
  }

  private getCreateUserResponseModelFromUser(newUserEntity: UserEntity) {
    const createUserResponse: ICreateUserResponseModel = {
      id: newUserEntity.getId()!,
      email: newUserEntity.getEmail()
    };
    return createUserResponse;
  }
}
