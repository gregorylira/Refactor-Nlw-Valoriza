import { Router } from "express";
import complimentRouter from "./routes/compliment.router";
import tagRouter from "./routes/tag.router";
import userRouter from "./routes/user.router";

export default () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({
      status: "ok",
    });
  });

  userRouter(router);
  tagRouter(router);
  complimentRouter(router);

  return router;
};
