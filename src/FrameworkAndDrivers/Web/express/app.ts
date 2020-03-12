import Server from './app/server/server.class';
import { ServerOptionsInterface } from './app/server/server.interface';
import config from './config/config';
const appConfig = config();

const serverAppOptions: ServerOptionsInterface = {
  env: appConfig.get('env'),
  logger: {
    enabled: appConfig.get('logger')
  },
  port: appConfig.get('port')
};

const serverApp = new Server(serverAppOptions);

export default serverApp;
