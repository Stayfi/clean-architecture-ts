import mongoose from 'mongoose';
import UserModel, { IUserModel } from './user.model';

const mongoDBTest = 'mongodb://192.168.99.100/login_test';

describe('#UserModel', () => {
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

  it('Should throw validation errors', () => {
    const user: IUserModel = new UserModel();

    expect(user.validate).toThrow();
  });

  it('Should save a user', async () => {
    expect.assertions(3);

    const user: IUserModel = new UserModel({
      email: 'test@example.com',
      password: 'Test password'
    });
    const spy = jest.spyOn(user, 'save');
    await user.save();

    expect(spy).toHaveBeenCalled();

    expect(user).toMatchObject({
      email: expect.any(String),
      password: expect.any(String)
    });

    expect(user.email).toBe('test@example.com');
  });
});
