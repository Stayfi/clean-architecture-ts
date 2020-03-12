import IViewModel from './IViewModel';

export default interface IView {
  render(viewModel: IViewModel): void;
}
