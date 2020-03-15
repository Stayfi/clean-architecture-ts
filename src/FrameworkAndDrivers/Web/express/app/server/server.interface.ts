import express from 'express';
import { appEnvironment } from '../_shared/app-environment.enum';

export interface ServerInterface {
  readonly app: express.Application;
  readonly options: ServerOptionsInterface;
  start(): boolean;
  initServer(): void;
  close(callBack: IErrorCallback): void;
}

export interface ServerOptionsInterface {
  env: appEnvironment;
  logger?: {
    enabled?: boolean;
  };
  port: number;
}

export interface IErrorCallback {
  (err?: Error | undefined): void;
}
