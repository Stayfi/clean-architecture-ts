import ICreateUserEntityGateway from '../../../../Components/User/UseCases/createUser/ICreateUserEntityGateway';
import UserEntity from '../../../../Components/User/Entities/UserEntity';
import UserModel, { IUserModel } from './user.model';

export default class UserEntityRepository implements ICreateUserEntityGateway {
  async findByEmail(email: string): Promise<UserEntity> {
    let userFindedByEmail: IUserModel | null = null;
    userFindedByEmail = await UserModel.findOne({
      email: email
    })
      .exec()
      .catch(err => {
        throw new Error('UserEntityRepository.findByEmail.err');
      });
    if (!userFindedByEmail) {
      throw new Error('user.notexist');
    }
    return userFindedByEmail!;
  }
  async create(newUserEntity: UserEntity): Promise<UserEntity> {
    const newUser: IUserModel = new UserModel(newUserEntity);
    await newUser.save((err, user) => {
      if (err || !user) {
        throw new Error('UserEntityRepository.save.err');
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
