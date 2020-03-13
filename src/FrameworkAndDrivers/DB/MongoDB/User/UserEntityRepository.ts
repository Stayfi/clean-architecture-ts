import ICreateUserEntityGateway from '../../../../Components/User/UseCases/createUser/ICreateUserEntityGateway';
import UserEntity from '../../../../Components/User/Entities/UserEntity';
import UserModel, { IUserModel } from './user.model';

export default class UserEntityRepository implements ICreateUserEntityGateway {
  async findByEmail(email: string): Promise<UserEntity> {
    let userByEmail: IUserModel | null = null;
    try {
      userByEmail = await UserModel.findOne({
        email: email
      }).exec();
    } catch (e) {
      console.log('err:', e);
    }
    if (!userByEmail) {
      throw new Error('user.notexist');
    }
    return userByEmail!;
  }
  async create(user: UserEntity): Promise<UserEntity> {
    const newUser: IUserModel = new UserModel(user);
    await newUser.save((err, user) => {
      if (err) {
        console.log('err:', err);
      }
      if (!user) {
        throw new Error('UserEntityRepository.save.user.undefined');
      }
    });
    const userSaved = new UserEntity(
      newUser.email,
      newUser.password,
      newUser._id
    );
    return userSaved;
  }
}
