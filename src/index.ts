import serverApp from './FrameworkAndDrivers/Web/express/app';
import * as db from './FrameworkAndDrivers/DB/MongoDB/db-connect';
import config from './FrameworkAndDrivers/Web/express/config/config';
const appConfig = config();

db.connect(appConfig.get('mongodbURI'));
serverApp.start();

process.on('SIGINT', () => {
  console.info('\x1b[31m', 'SIGINT signal reveived', '\x1b[0m');
  serverApp.close(async err => {
    if (err) {
      console.info('\x1b[31m', err, '\x1b[0m');
      process.exit(1);
    }
  });
});
