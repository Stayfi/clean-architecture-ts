import express from 'express';

export default interface RouterInterface {
  getRouter(): express.Router;
}
