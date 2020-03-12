import express from 'express';
import { appEnvironment } from '../_shared/app-environment.enum';

export interface ServerInterface {
  readonly app: express.Application;
  readonly options: ServerOptionsInterface;
  start(): boolean;
  initServer(): void;
  stop(): void;
}

export interface ServerOptionsInterface {
  env: appEnvironment;
  logger?: {
    enabled?: boolean;
  };
  port: number;
}
