import IView from '../../../ComponentInterfaces/InterfaceAdapters/IView';
import ICreateUserViewModel from './ICreateUserViewModel';

export default interface ICreateUserView extends IView {
  render(viewModel: ICreateUserViewModel): void;
}
