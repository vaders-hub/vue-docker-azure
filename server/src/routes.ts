import express, { Application, Request, Response } from "express";
import { indexRouter } from "./routes/index";

const routes = (app: Application): void => {
  app.all("/*", function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.use("/api", indexRouter);
};

export default routes;
