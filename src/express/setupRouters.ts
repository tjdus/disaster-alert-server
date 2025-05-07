import { Express } from "express";
import cookieParser from "cookie-parser";
import * as R from "../routers";

export const setupRouters = (app: Express, ...args: any[]): Express => {
  // prettier-ignore
  app.use(cookieParser());
  return app
    .use("/nearby", R.nearbyShelterRouter(...args))
    .use("/disaster-alerts", R.disasterAlertRouter(...args))
    .use("/papago-api", R.papagoTranslationRouter(...args))
    .use("/weather", R.weatherRouter(...args));
};
