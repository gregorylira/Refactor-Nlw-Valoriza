import { Router } from "express";
import userRouter from "./routes/user.router";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      status: "ok",
    });
  });

  userRouter(router);

  return router;
};
