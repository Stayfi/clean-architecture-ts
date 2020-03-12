import CreateUserPresenter from '../CreateUserPresenter';
import ICreateUserView from '../ICreateUserView';
import ICreateUserResponseModel from '../../UseCases/User/createUser/ICreateUserResponseModel';
import ICreateUserViewModel from '../ICreateUserViewModel';
import * as testIncludes from './CreateUserPresenter.spec.inc';

describe('#CreateUserPresenter', () => {

  let consoleInfos: Array<any> = new Array();
  console.info = function(info: string) { consoleInfos.push(info); };
  const createUserView: ICreateUserView = testIncludes.getCreateUserViewModel();

  beforeEach(function() {
    consoleInfos = [];
  });

  it("Should create new CreateUserPresenter succeed", () => {
    const createUserPresenter: CreateUserPresenter = new CreateUserPresenter(createUserView);
    expect(createUserPresenter).toMatchObject(new CreateUserPresenter(createUserView));
  });

  it("Should presente result to userCreated true when valid CreateUserResponseModel", () => {
    const createUserPresenter: CreateUserPresenter = new CreateUserPresenter(createUserView);
    const createUserResponseModel: ICreateUserResponseModel = { id: '1', email: 'CreateUserPresenter@mail.test' };
    createUserPresenter.presente(createUserResponseModel);
    expect(((consoleInfos[0]) as ICreateUserViewModel).userCreated).toBeTruthy();
  });

  it("Should presente result to userCreated false when invalid CreateUserResponseModel", () => {
    const createUserPresenter: CreateUserPresenter = new CreateUserPresenter(createUserView);
    const createUserResponseModel: ICreateUserResponseModel = { email: 'CreateUserPresenter@mail.test' };
    createUserPresenter.presente(createUserResponseModel);
    expect(((consoleInfos[0]) as ICreateUserViewModel).userCreated).toBeFalsy();
  });

  it("Should presente result return error message 'CreateUserPresenter.id.undefined' when id is undefined", () => {
    const createUserPresenter: CreateUserPresenter = new CreateUserPresenter(createUserView);
    const createUserResponseModel: ICreateUserResponseModel = { email: 'CreateUserPresenter@mail.test' };
    createUserPresenter.presente(createUserResponseModel);
    expect(((consoleInfos[0]) as ICreateUserViewModel).errors).toContain('CreateUserPresenter.id.undefined');
  });

});
