import mongoose from 'mongoose';
import UserEntityRepository from './UserEntityRepository';
import UserEntity from '../../../../Components/User/Entities/UserEntity';


const mongoDBTest = 'mongodb://192.168.99.100/login_test';

describe('#UserEntityRepository without MongoDB connexion', () => {
  const emailTest = 'stayfi@test.test';
  const emailTestNotSaved = 'stayfi-not-found@test.test';
  const passwordTest = 'Stayfi Password';

  it('Should create new user', async () => {
    const newUserEntity: UserEntity = new UserEntity(emailTest, passwordTest);
    const userEntityRepository: UserEntityRepository = new UserEntityRepository();
    const spy = jest.spyOn(userEntityRepository, 'create');
    //const newUserSaved = 
    await userEntityRepository.create(newUserEntity);

    expect(spy).toHaveBeenCalled();
  });


  it(`Should not find user by mail ${emailTestNotSaved}`, async done => {
    expect.assertions(1);
    const userEntityRepository: UserEntityRepository = new UserEntityRepository();
    let isDone = false;
    jest.setTimeout(10000);
    setTimeout(() => {
      expect(isDone).toBeFalsy();
      done();
    }, 5000);
    try {
      await userEntityRepository.findByEmail(emailTestNotSaved);
      isDone = true;
    } catch (e) {
      expect(e.message).toEqual('user.notexist');
    }
  });
});

describe('#UserEntityRepository with MongoDB connexion', () => {
  const emailTest = 'stayfi@test.test';
  const emailTestNotSaved = 'stayfi-not-found@test.test';
  const passwordTest = 'Stayfi Password';

  beforeAll(async () => {
    await mongoose.connect(mongoDBTest, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  it('Should create new user', async () => {
    expect.assertions(4);

    const newUserEntity: UserEntity = new UserEntity(emailTest, passwordTest);
    const userEntityRepository: UserEntityRepository = new UserEntityRepository();
    const spy = jest.spyOn(userEntityRepository, 'create');
    const newUserSaved = await userEntityRepository.create(newUserEntity);

    expect(spy).toHaveBeenCalled();

    expect(newUserSaved).toMatchObject({
      email: expect.any(String),
      password: expect.any(String)
    });

    expect(newUserSaved.email).toBe(emailTest);
    expect(newUserSaved.password).toBe(passwordTest);
  });

  it(`Should find user by mail ${emailTest}`, async () => {
    const userEntityRepository: UserEntityRepository = new UserEntityRepository();
    const userTest = await userEntityRepository.findByEmail(emailTest);

    expect(userTest.email).toBe(emailTest);
    expect(userTest.password).toBe(passwordTest);
  });

  it(`Should not find user by mail ${emailTestNotSaved}`, async () => {
    jest.setTimeout(10000);
    const userEntityRepository: UserEntityRepository = new UserEntityRepository();
    try {
      await userEntityRepository.findByEmail(emailTestNotSaved);
    } catch (e) {
      expect(e.message).toEqual('user.notexist');
    }
  });
});
