import UserEntity from '../../../Entities/UserEntity';
import ICreateUserEntityGateway from '../../../UseCases/createUser/ICreateUserEntityGateway';
import ICreateUserView from '../ICreateUserView';
import ICreateUserViewModel from '../ICreateUserViewModel';

const userTestExisting: UserEntity = new UserEntity(
  'existingUser@mail.test',
  'CreateUserEntityRepositoryPassword',
  '1'
);

export class CreateUserEntityRepositoryTest
  implements ICreateUserEntityGateway {
  findByEmail(email: string): Promise<UserEntity> {
    if (email !== userTestExisting.getEmail()) {
      throw new Error('user.notexist');
    }
    return new Promise<UserEntity>(resolve => {
      resolve(userTestExisting);
    });
  }

  create(userEntity: UserEntity): Promise<UserEntity> {
    return new Promise<UserEntity>(resolve => {
      resolve(userEntity);
    });
  }
}

export class CreateUserViewTest implements ICreateUserView {
  render(viewModel: ICreateUserViewModel): void {
    throw new Error('CreateUserViewTest.render not implemented (test only)');
  }
}
