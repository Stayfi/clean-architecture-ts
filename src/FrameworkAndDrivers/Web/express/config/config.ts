import convict = require('convict');
import path from 'path';
import fs from 'fs';
import { appSchemaConfig } from './app-schema.conf';
import dotenv from 'dotenv';
dotenv.config();

export default () => {
  const config = convict(appSchemaConfig);
  const env = config.get('env');
  const defaultConfFiles = [
    path.join(__dirname, `./${env}.conf.json`),
    path.join(__dirname, './app.conf.json')
  ];
  try {
    const confFilesOk: string[] = [];
    defaultConfFiles.forEach(path => {
      if (fs.existsSync(path)) {
        confFilesOk.push(path);
      }
    });
    config.loadFile(confFilesOk);
  } catch (err) {
    console.error('\x1b[31m', '[config]', err.message, '\x1b[0m');
  }
  config.validate({ strict: true });

  return config;
};
