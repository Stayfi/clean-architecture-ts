import ICreateUserResponseModel from '../../UseCases/createUser/ICreateUserResponseModel';

export default class CreateUserViewModelMapper {
  static mapFromCreateUserResponseModel(
    createUserResponseModel: ICreateUserResponseModel
  ) {
    return {
      userCreated: createUserResponseModel.id! ? true : false,
      id: createUserResponseModel.id!,
      email: createUserResponseModel.email
    };
  }
}
