import express from 'express';
import ActionViewInterface from '../../../../_shared/action-view.interface';
import CreateUserController from '../../../../../../../../Components/User/InterfaceAdapters/CreateUserController';
import ICreateUserEntityGateway from '../../../../../../../../Components/User/UseCases/User/createUser/ICreateUserEntityGateway';
import IView from '../../../../../../../../ComponentInterfaces/InterfaceAdapters/IView';
import CreateUserControllerRequestModel from '../../../../../../../../Components/User/InterfaceAdapters/ICreateUserControllerRequest';
import UserEntityRepository from '../../../../../../../DB/MongoDB/User/UserEntityRepository';
import { View } from '../views/createUserView';

export default class CreateUserDeliver {
  private req: express.Request;
  private res: express.Response;

  constructor(req: express.Request, res: express.Response) {
    this.req = req;
    this.res = res;
  }

  public async IndexActionView(): Promise<void> {
    const userRepository: UserEntityRepository = new UserEntityRepository();
    const view: IView = new View(this.res);
    const createUserController: CreateUserController = new CreateUserController(
      userRepository as ICreateUserEntityGateway,
      view
    );
    try {
      await createUserController.execute({
        email: this.req.body.email,
        password: this.req.body.password
      } as CreateUserControllerRequestModel);
    } catch (err) {
      const pageParams = {
        title: 'Clearn Architecture - Node.js',
        error_message: err.message
      };
      const viewParams: ActionViewInterface = {
        view: 'UsesCases/User/createUser/views/createUserView.njk',
        params: pageParams
      };
      this.res.render(viewParams.view, viewParams.params);
    }
  }
}
