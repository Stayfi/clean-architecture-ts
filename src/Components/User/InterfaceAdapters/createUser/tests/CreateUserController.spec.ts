import CreateUserController from '../CreateUserController';
import CreateUserInteractor from '../../../UseCases/createUser/CreateUserInteractor';
import CreateUserControllerRequest from '../ICreateUserControllerRequest';
import CreateUserPresenter from '../CreateUserPresenter';
import ICreateUserRequestModel from '../../../UseCases/createUser/ICreateUserRequestModel';
import * as testIncludes from './CreateUserController.spec.inc';

describe('#CreateUserController', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };

  beforeEach(function() {
    consoleInfos = [];
  });

  it("Should create new CreateUserController succeed", () => {
    const createUserEntityRepository = new testIncludes.CreateUserEntityRepositoryTest();
    const createUserView = new testIncludes.CreateUserViewTest();
    const createUserController: CreateUserController = new CreateUserController(
      createUserEntityRepository,
      createUserView
    );
    expect(createUserController).toMatchObject(new CreateUserController(
      createUserEntityRepository,
      createUserView
    ));
  });

  it("Should getCreateUserInteractor return CreateUserInteractor", async () => {
    expect.assertions(2);
    const createUserEntityRepository = new testIncludes.CreateUserEntityRepositoryTest();
    const createUserView = new testIncludes.CreateUserViewTest();
    const createUserController: CreateUserController = new CreateUserController(
      createUserEntityRepository,
      createUserView
    );
    const createUserControllerRequest: CreateUserControllerRequest = {
      email: 'email@email.test',
      password: 'password-test'
    }
    const spy = jest.spyOn(createUserController, 'execute');
    try {
      await createUserController.execute(createUserControllerRequest);
    } catch (e) {
      expect(e.message).toBe('CreateUserViewTest.render not implemented (test only)');
    }
    expect(spy).toHaveBeenCalled();

  });

  it("Should getCreateUserInteractor return CreateUserInteractor", () => {
    const createUserEntityRepository = new testIncludes.CreateUserEntityRepositoryTest();
    const createUserView = new testIncludes.CreateUserViewTest();
    const createUserController: CreateUserController = new CreateUserController(
      createUserEntityRepository,
      createUserView
    );
    expect(createUserController['getCreateUserInteractor']()).toMatchObject(new CreateUserInteractor(
      createUserEntityRepository,
      new CreateUserPresenter(createUserView)
    ));
  });

  it("Should getCreateUserRequestModelFromRequest return CreateUserControllerRequest", () => {
    const createUserEntityRepository = new testIncludes.CreateUserEntityRepositoryTest();
    const createUserView = new testIncludes.CreateUserViewTest();
    const createUserController: CreateUserController = new CreateUserController(
      createUserEntityRepository,
      createUserView
    );
    const createUserRequestModel: ICreateUserRequestModel = {
      email: 'email@email.test',
      password: 'password-test'
    };
    const createUserControllerRequest: CreateUserControllerRequest = {
      email: 'email@email.test',
      password: 'password-test'
    }
    expect(createUserController['getCreateUserRequestModelFromRequest'](createUserControllerRequest)).toMatchObject(
      createUserRequestModel
    );
  });

});
