import CreateUserInteractor from '../CreateUserInteractor';
import ICreateUserEntityGateway from '../ICreateUserEntityGateway';
import ICreateUserRequestModel from '../ICreateUserRequestModel';
import IPresenterOuputBoundary from '../../../../../ComponentInterfaces/InterfaceAdapters/IPresenterOuputBoundary';
import IView from '../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import * as testIncludes from './CreateUserInteractor.spec.inc';
import ICreateUserViewModel from '../../../InterfaceAdapters/createUser/ICreateUserViewModel';

describe('#CreateUserInteractor', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };
  const createUserRequestModel: ICreateUserRequestModel = testIncludes.getCreateUserRequestModelTest();
  const createUserExistRequestModel: ICreateUserRequestModel = testIncludes.getCreateUserExistRequestModel();
  const entityRepository: ICreateUserEntityGateway = testIncludes.getCreateUserEntityRepository(createUserRequestModel);
  const entityRepositorySaveFailing: ICreateUserEntityGateway = testIncludes.getCreateUserEntityRepositorySaveFailing(createUserRequestModel);
  const view: IView = testIncludes.getTestView();
  const presenter: IPresenterOuputBoundary = testIncludes.getTestPresenter(view);

  beforeEach(function() {
    consoleInfos = [];
  });

  it('should new user execute responseModel userCreated being true', async () => {
    const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepository, presenter);
    await userInteractor.execute(createUserRequestModel);
    expect(((consoleInfos[0]) as ICreateUserViewModel).userCreated).toBe(true);
  })

  it('should return error when email and password is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: '',
        password: ''
      });
    } catch (e) {
      expect(e.message).toBe('CreateUserInteractor.email_and_password.empty');
    }
  })

  it('should return error when email is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: '',
        password: 'passwordtest'
      });
    } catch (e) {
      expect(e.message).toBe('CreateUserInteractor.email.empty');
    }
  })

  it('should return error when password is empty', async () => {
    expect.assertions(1);
    try {
      const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepository, presenter);
      await userInteractor.execute({
        email: 'email@mail.test',
        password: ''
      });
    } catch (e) {
      expect(e.message).toBe('CreateUserInteractor.password.empty');
    }
  })

  it('should new user throw error when email exist', async () => {
    expect.assertions(1);
    try {
      const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepository, presenter);
      await userInteractor.execute(createUserExistRequestModel);
    } catch (e) {
      expect(e.message).toBe('CreateUserInteractor.newuser.exist');
    }
  })

  it('should new user throw error when repository save failed', async () => {
    expect.assertions(1);
    try {
      const userInteractor: CreateUserInteractor = new CreateUserInteractor(entityRepositorySaveFailing, presenter);
      await userInteractor.execute(createUserRequestModel);
    } catch (e) {
      expect(e.message).toBe('CreateUserInteractor.repository.create.error');
    }
  })
});
