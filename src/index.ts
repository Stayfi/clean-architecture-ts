import serverApp from './FrameworkAndDrivers/Web/express/app';
import dbconnect from './FrameworkAndDrivers/DB/MongoDB/db-connect';
import config from './FrameworkAndDrivers/Web/express/config/config';
const appConfig = config();

dbconnect(appConfig.get('mongodbURI'));
serverApp.start();
