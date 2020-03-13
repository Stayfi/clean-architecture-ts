import ICreateUserView from '../ICreateUserView';
import ICreateUserViewModel from '../ICreateUserViewModel';

export function getCreateUserViewModel(): ICreateUserView {
  return {
    render: (createUserViewModel: ICreateUserViewModel) => {
      console.info(createUserViewModel);
    }
  };
}
