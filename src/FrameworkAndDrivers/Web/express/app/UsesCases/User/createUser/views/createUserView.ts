import express from 'express';
import IView from '../../../../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import ActionViewInterface from '../../../../_shared/action-view.interface';
import IViewModel from '../../../../../../../../ComponentInterfaces/InterfaceAdapters/IViewModel';

export class View implements IView {
  private res: express.Response;
  constructor(res: express.Response) {
    this.res = res;
  }
  render(viewModel: IViewModel): void {
    const pageParams = {
      title: 'Clearn Architecture - Node.js',
      success_message: 'user.added'
    };
    const viewParams: ActionViewInterface = {
      view: 'UsesCases/User/createUser/views/createUserView.njk',
      params: pageParams
    };
    this.res.render(viewParams.view, viewParams.params);
  }
}
