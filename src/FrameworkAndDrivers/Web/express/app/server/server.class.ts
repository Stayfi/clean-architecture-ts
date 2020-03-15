import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http';
import morgan from 'morgan';
import nunjucks from 'nunjucks';
import { ServerInterface, ServerOptionsInterface } from './server.interface';
import ServerRouter from './server.router.class';

export default class Server implements ServerInterface {
  public readonly app: express.Application;
  public readonly options: ServerOptionsInterface;
  private serverInitialized: boolean = false;
  private serverListener: http.Server | undefined = undefined;

  constructor(options: ServerOptionsInterface) {
    this.options = options;
    this.app = express();
  }

  public start(): boolean {
    let serverStarted: boolean = false;
    try {
      this.initServer();
      this.serverListener = this.app.listen(this.options.port, () => {
        this.appListeningHandler();
      });
    } finally {
      serverStarted = true;
    }

    return serverStarted;
  }

  public initServer(): void {
    if (!this.serverInitialized) {
      this.setAppSettings();
      this.setAppViewEngine();
      this.setAppMiddlewars();
      this.setAppRouter();
      this.serverInitialized = true;
    }
  }

  public close(): void {
    this.serverListener!.close();
  }

  private setAppSettings(): void {
    this.app.disable('x-powered-by');
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static('public'));
  }

  private setAppViewEngine(): void {
    nunjucks.configure(__dirname + '/..', {
      autoescape: true,
      express: this.app
    });
  }

  private setAppMiddlewars(): void {
    if (this.options.logger && this.options.logger!.enabled) {
      this.app.use(morgan('dev'));
    }
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.urlencoded({ extended: false }));
  }

  private setAppRouter(): void {
    this.app.use('/', new ServerRouter().getRouter());
  }

  private appListeningHandler(): void {
    this.nodeEnvInformation();
    this.loggerInformation();
    console.log(
      '\x1b[32m%s\x1b[0m',
      '√ Server is running on port ' + this.options.port
    );
  }

  private loggerInformation(): boolean {
    let loggerEnabled: boolean = false;
    if (this.options.logger && this.options.logger!.enabled) {
      console.log('\x1b[33m%s\x1b[0m', '√ Logger enabled');
      loggerEnabled = true;
    }
    return loggerEnabled;
  }

  private nodeEnvInformation(): void {
    console.log(
      '\x1b[36m%s\x1b[0m',
      `√ ${this.options.env[0].toUpperCase()}${this.options.env.slice(1)} mode`
    );
  }
}
