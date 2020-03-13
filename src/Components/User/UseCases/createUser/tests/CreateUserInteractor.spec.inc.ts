import ICreateUserRequestModel from '../ICreateUserRequestModel';
import ICreateUserResponseModel from '../ICreateUserResponseModel';
import IPresenterOuputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import UserEntity from '../../../Entities/UserEntity';
import IView from '../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import ICreateUserViewModel from '../../../InterfaceAdapters/createUser/ICreateUserViewModel';

export function getCreateUserRequestModelTest(): ICreateUserRequestModel {
  return {
    email: 'CreateUserRequestModel@mail.test',
    password: 'myPasswordTest'
  };
}

export function getCreateUserExistRequestModel(): ICreateUserRequestModel {
  return {
    email: 'getCreateUserExistRequestModel@mail.test',
    password: 'CreateUserRequestModelPassword'
  };
}

function findByEmailMocked(email: string): Promise<UserEntity> {
  const userTestExisting: UserEntity = new UserEntity(
    'getCreateUserExistRequestModel@mail.test',
    'getCreateUserExistRequestModel',
    '1'
  );
  if (email !== userTestExisting.getEmail()) {
    throw new Error('user.notexist');
  }
  return new Promise<UserEntity>(resolve => {
    resolve(userTestExisting);
  });
}

export function getCreateUserEntityRepository(
  createUserRequestModel: ICreateUserRequestModel
) {
  const newUserTestSaved: UserEntity = new UserEntity(
    createUserRequestModel.email,
    createUserRequestModel.password,
    '2'
  );
  return {
    findByEmail: findByEmailMocked,

    create: (): Promise<UserEntity> => {
      return new Promise<UserEntity>(resolve => {
        resolve(newUserTestSaved);
      });
    }
  };
}

export function getCreateUserEntityRepositorySaveFailing(
  createUserRequestModel: ICreateUserRequestModel
) {
  return {
    findByEmail: findByEmailMocked,

    create: (): Promise<UserEntity> => {
      return new Promise<UserEntity>(() => {
        throw new Error('getTestEntityRepositorySaveFailing');
      });
    }
  };
}

export function getTestView(): IView {
  return {
    render: (viewModel: ICreateUserViewModel) => {
      console.info(viewModel);
    }
  };
}

export function getTestPresenter(view: IView): IPresenterOuputBoundary {
  return {
    presente: (responseModel: ICreateUserResponseModel): void => {
      const viewModel: ICreateUserViewModel = {
        userCreated: true,
        id: responseModel.id,
        email: responseModel.email
      };
      view.render(viewModel);
    }
  };
}
