import { Request, Response, Router } from "express";
import { ComplimentService } from "../../services/compliment.services";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const route = Router();
const complimentService = new ComplimentService();

export default (app: Router) => {
  app.use("/compliment", route);

  app.post(
    "/compliment",
    ensureAuthenticated,
    async (req: Request, res: Response) => {
      const { userSender, userReceiver, tagId, message } = req.body;

      const compliment = await complimentService.createCompliment({
        userSender,
        userReceiver,
        tagId,
        message,
      });
      return res.status(201).json(compliment);
    }
  );

  app.get(
    "/compliment/send/:id",
    ensureAuthenticated,
    async (req: Request, res: Response) => {
      const userId = req.params.id;

      const compliment = await complimentService.ListUserSenderCompliment(
        userId
      );

      return res.status(200).json(compliment);
    }
  );

  app.get(
    "/compliment/receiver/:id",
    ensureAuthenticated,
    async (req: Request, res: Response) => {
      const userId = req.params.id;

      const compliment = await complimentService.ListUserReceiverCompliment(
        userId
      );

      return res.status(200).json(compliment);
    }
  );
};
