import request from 'supertest';
import treeKill from 'tree-kill';

export default function serverStartTests() {
  describe('#Start: Server start test ', () => {
    const serverTestPort = 3003;
    const serverTestLoggerPort = 3004;
    const serverTestProductionDisabledPort = 3005;
    const serverTestProductionEnabledPort = 3006;
    let serverTestToBeKill: any;

    beforeAll(() => {
      const NPM_CMD: string = getNpmCmd();
      require('child_process').spawn(NPM_CMD, ['run', `build:prod`]);
      require('child_process').spawn(NPM_CMD, ['run', `assets:view`]);
    });

    it(`Start Server should log on console 'Server is running on port ${serverTestPort}'`, done => {
      let goDone = true;
      const serverTest = getServerRunning(serverTestPort, 'prod');
      serverTestToBeKill = serverTest;

      serverTest.stdout.on('data', (data: {}) => {
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestPort}`) >= 0 &&
          goDone
        ) {
          goDone = false;
          return done();
        }
      });
    });

    it(`When started, should http://localhost:${serverTestPort} return status 200`, async () => {
      const res = await request(`http://localhost:${serverTestPort}`).get('/');

      expect(res.status).toEqual(200);
    });

    it('Server should be killed', done => {
      treeKill(serverTestToBeKill.pid, 'SIGTERM', done);
    });

    // tslint:disable-next-line: max-line-length
    it(`Start Server without logger should not log 'Logger enabled'`, done => {
      const serverTestLoggerDisabled = getServerRunning(
        serverTestLoggerPort,
        'prod'
      );

      serverTestLoggerDisabled.stdout.on('data', (data: {}) => {
        if (typeof data === 'string' && data.indexOf(`Logger enabled`) >= 0) {
          throw new Error('Logger not disabled');
        }
        if (
          typeof data === 'string' &&
          data.indexOf(`Server is running on port ${serverTestLoggerPort}`) >= 0
        ) {
          treeKill(serverTestLoggerDisabled.pid, 'SIGTERM', done);
        }
      });
    });

    it(`Start:dev should not log 'Production mode'`, done => {
      const serverTestProductionDisabled = getServerRunning(
        serverTestProductionDisabledPort,
        'dev'
      );

      serverTestProductionDisabled.stdout.on('data', (data: {}) => {
        if (typeof data === 'string' && data.indexOf(`Production mode`) >= 0) {
          throw new Error('Production mode activated');
        }
        if (
          typeof data === 'string' &&
          data.indexOf(
            `Server is running on port ${serverTestProductionDisabledPort}`
          ) >= 0
        ) {
          treeKill(serverTestProductionDisabled.pid, 'SIGTERM', done);
        }
      });
    });

    it(`Start:prod should log 'Production mode'`, done => {
      jest.setTimeout(30000);
      let isDone = false;
      setTimeout(() => {
        if (!isDone) done(new Error('Production mode test: Timeout'));
      }, 10000);
      const serverTestProductionEnabled = getServerRunning(
        serverTestProductionEnabledPort,
        'prod'
      );
      let isProduction = false;

      serverTestProductionEnabled.stdout.on('data', (data: {}) => {
        if (typeof data === 'string' && data.indexOf(`Production mode`) >= 0) {
          isProduction = true;
        }
        if (
          typeof data === 'string' &&
          data.indexOf(
            `Server is running on port ${serverTestProductionEnabledPort}`
          ) >= 0
        ) {
          expect(isProduction).toBeTruthy();
          isDone = true;
          treeKill(serverTestProductionEnabled.pid, 'SIGTERM', done);
        }
      });
    });
  });
}

function getServerRunning(port: number, env: string) {
  const NPM_CMD: string = getNpmCmd();
  const serverRunning = require('child_process').spawn(NPM_CMD, [
    'run',
    `start:${env}`,
    '--',
    '--port',
    port
  ]);
  serverRunning.stdout.setEncoding('utf8');
  serverRunning.stderr.setEncoding('utf8');

  return serverRunning;
}
function getNpmCmd(): string {
  let NPM_CMD: string = 'npm';
  if (process.platform === 'win32') {
    NPM_CMD = 'npm.cmd';
  }
  return NPM_CMD;
}
