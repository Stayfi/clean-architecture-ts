import * as sinon from 'sinon';
import { appEnvironment } from './app/_shared/app-environment.enum';
import config from './config/config';
const defaultConf = require('./config/default.conf.json');
const developmentConf = require('./config/development.conf.json');
const testConf = require('./config/test.conf.json');
const stagingConf = require('./config/staging.conf.json');
const productionConf = require('./config/production.conf.json');
const sandbox = sinon.createSandbox();

export default function environmentsServerconfigTests() {
  describe('#Config: Environments server config test ', function() {
    const loggerIsEnabled = true;
    const loggerIsDisabled = false;
    const serverPortDevelopment = developmentConf.port;
    const serverPortTest = testConf.port;
    const serverPortStaging = stagingConf.port;
    const serverPortProduction = productionConf.port;

    describe('#Env:Default server env is "development"', function() {
      expect(defaultConf.env).toEqual(appEnvironment.DEV);
    });

    describe('#Env:Development server config test ', function() {
      serverConfigTest(
        appEnvironment.DEV,
        loggerIsEnabled,
        serverPortDevelopment
      );
    });

    describe('#Env:Test server config test ', function() {
      serverConfigTest(appEnvironment.TEST, loggerIsDisabled, serverPortTest);
    });

    describe('#Env:Staging server config test ', function() {
      serverConfigTest(
        appEnvironment.STAGING,
        loggerIsDisabled,
        serverPortStaging
      );
    });

    describe('#Env:Production server config test ', function() {
      serverConfigTest(
        appEnvironment.PROD,
        loggerIsDisabled,
        serverPortProduction
      );
    });
  });
}

function serverConfigTest(
  appEnvToTest: appEnvironment,
  loggerStatutExpected: Boolean,
  serverPortExpected: number
) {
  it(`${appEnvToTest} config env should be setted`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvToTest });
    const configTest = config();
    expect(configTest.get('env')).toEqual(appEnvToTest);
    sandbox.restore();
  });

  it(`${appEnvToTest} config logger should be ${loggerStatutExpected}`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvToTest });
    const configTest = config();
    expect(configTest.get('logger')).toEqual(loggerStatutExpected);
    sandbox.restore();
  });

  it(`${appEnvToTest} config port should be ${serverPortExpected}`, async function() {
    sandbox.stub(process, 'env').value({ NODE_ENV: appEnvToTest });
    const configTest = config();
    expect(configTest.get('port')).toEqual(serverPortExpected);
    sandbox.restore();
  });
}