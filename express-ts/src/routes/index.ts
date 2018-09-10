import { Response, Request, NextFunction, Router } from "express";
import { validate } from "middlewares/reqValidate";
import { filterLog } from "middlewares/logFilter";

const indexRouter = Router();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  indexRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send("ok in development");
  });
} else {
  indexRouter.get("/", filterLog, (req: Request, res: Response) => {
    res.status(200).send("ok in production");
  });
}

export default indexRouter;
