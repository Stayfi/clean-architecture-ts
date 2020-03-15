import * as sinon from 'sinon';
import request from 'supertest';
import Server from './server.class';
import { appEnvironment } from '../_shared/app-environment.enum';
import { ServerOptionsInterface } from './server.interface';
import config from '../../config/config';

const sandbox = sinon.createSandbox();

describe('#Server config test', function() {
  let serverConsoleLogStub: sinon.SinonStub<[any?, ...any[]], void>;
  beforeEach(function() {
    serverConsoleLogStub = sinon.stub(console, 'log');
  });

  it('Should test port setted to 3100', async function() {
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    expect(serverTest.options.port).toEqual(3100);
  });

  it(`Should views_path be set to 'src/FrameworkAndDrivers/Web/express/app' when not PROD_ENV`, async function() {
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const views_path = serverTest['getViewPath']();
    expect(views_path).toEqual('src/FrameworkAndDrivers/Web/express/app');
  });

  it(`Should views_path be set to 'dist/FrameworkAndDrivers/Web/express/app' when Production mode`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.PROD });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const views_path = serverTest['getViewPath']();
    expect(views_path).toEqual('dist/FrameworkAndDrivers/Web/express/app');
  });

  it(`Should console.log('√ Logger enabled') when logger enabled`, async function() {
    sandbox.stub(process, 'env').value({ LOGGER: true });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const loggerEnabled = serverTest['loggerInformation']();
    // @ts-ignore
    expect(console.log.calledWith('\x1b[33m%s\x1b[0m', '√ Logger enabled')).toBeTruthy();
    expect(loggerEnabled).toBeTruthy();
  });

  it(`Should NO console.log('√ Logger enabled') when logger isabled`, async function() {
    sandbox.stub(process, 'env').value({ LOGGER: false });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    const loggerEnabled = serverTest['loggerInformation']();
    // @ts-ignore
    expect(console.log.calledWith('\x1b[33m%s\x1b[0m', '√ Logger enabled')).toBeFalsy();
    expect(loggerEnabled).toBeFalsy();
  });

  it(`Should console.log('√ Staging mode') when staging environment`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.STAGING });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest['nodeEnvInformation']();
    // @ts-ignore
    expect(console.log.calledWith('\x1b[36m%s\x1b[0m', '√ Staging mode')).toBeTruthy();
  });

  it(`Should console.log('√ Production mode') when production environment`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.PROD });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest['nodeEnvInformation']();
    // @ts-ignore
    expect(console.log.calledWith('\x1b[36m%s\x1b[0m', '√ Production mode')).toBeTruthy();
  });

  it(`When started, should index return status 200`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvironment.TEST });
    const serverAppOptions = getServerAppOptions();
    const serverTest: Server = getInitializedServer(serverAppOptions);
    serverTest.start();
    const res = await request(
      `http://localhost:${serverTest.options.port}`
    ).get('/');
    expect(res.status).toEqual(200);
    serverTest.close();
  });

  afterEach(function() {
    serverConsoleLogStub.restore();
  });
});

function getInitializedServer(options: ServerOptionsInterface): Server {
  const serverTest = new Server(options);
  serverTest.initServer();
  return serverTest;
}

function getServerAppOptions(): ServerOptionsInterface {
  const appConfig = config();
  const serverAppOptions: ServerOptionsInterface = {
    env: appConfig.get('env') as appEnvironment,
    logger: {
      enabled: appConfig.get('logger')
    },
    port: appConfig.get('port')
  };

  return serverAppOptions;
}