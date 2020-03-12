import { appEnvironment } from '../app/_shared/app-environment.enum';

export const appSchemaConfig = {
  env: {
    doc: 'The applicaton environment.',
    format: ([
      'development',
      'test',
      'staging',
      'production'
    ] as unknown) as appEnvironment,
    default: appEnvironment.DEV,
    env: 'NODE_ENV',
    arg: 'node-env'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT',
    arg: 'port'
  },
  logger: {
    doc: 'Logger enabled.',
    format: 'Boolean',
    default: false,
    env: 'LOGGER',
    arg: 'logger'
  },
  mongodbURI: {
    doc: 'MongoDB URI.',
    format: String,
    default: 'mongodb://192.168.99.100/login_dev',
    env: 'MONGODB_URI',
    arg: 'mongodb-uri'
  }
};
