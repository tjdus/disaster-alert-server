import { Express } from "express";
import cookieParser from "cookie-parser";

export const setupRouters = (app: Express, ...args: any[]): Express => {
  // prettier-ignore
  app.use(cookieParser());
  return app;
};
