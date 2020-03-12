import express from 'express';
import RouterInterface from '../_shared/router.interface';
import CreateUserDeliver from './User/createUser/delivers/createUserDeliver';
import ActionViewInterface from '../_shared/action-view.interface';
const router = express.Router();

export default class UseCaseRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    this.router.post(
      '/',
      async (request: express.Request, response: express.Response) => {
        const createUserDeliver = new CreateUserDeliver(request, response);
        await createUserDeliver.IndexActionView();
      }
    );
    this.router.get(
      '/',
      (request: express.Request, response: express.Response) => {
        const pageParams = {
          title: 'Clearn Architecture - Node.js',
          message: ''
        };
        const viewParams: ActionViewInterface = {
          view: 'UsesCases/User/createUser/views/createUserView.njk',
          params: pageParams
        };
        response.render(viewParams.view, viewParams.params);
      }
    );
  }
}
