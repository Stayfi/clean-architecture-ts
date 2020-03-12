import UserEntity from '../UserEntity';

describe('#UserEntity', () => {

  const emailTest: string = 'UserEntity@mail.test';
  const passwordTest: string = 'UserEntityPassword';
  const idTest: string = 'idTest';

  it('should return id setted', () => {
    const userEntity: UserEntity = new UserEntity(emailTest, passwordTest, idTest);
    expect(userEntity.getId()).toBe(idTest);
  })

  it('should return email setted', () => {
    const userEntity: UserEntity = new UserEntity(emailTest, passwordTest);
    expect(userEntity.getEmail()).toBe(emailTest);
  })


  it('should return password handled', () => {
    const userEntity: UserEntity = new UserEntity(emailTest, passwordTest);
    expect(userEntity.checkPassword(passwordTest)).toBe(true);
  })

});
