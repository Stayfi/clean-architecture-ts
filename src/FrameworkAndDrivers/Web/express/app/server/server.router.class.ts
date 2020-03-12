import express from 'express';
import RouterInterface from '../_shared/router.interface';
import UsesCasesRouter from '../UsesCases/usescases.router.class';
const router = express.Router();

export default class ServerRouter implements RouterInterface {
  private router: express.Router = router;

  constructor() {
    this.initRouter();
  }

  public getRouter(): express.Router {
    return this.router;
  }

  private initRouter(): void {
    this.router.use('/', new UsesCasesRouter().getRouter());
  }
}
