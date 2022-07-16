import { request, Request, Response, Router } from "express";
import { TagServices } from "../../services/tag.services";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const route = Router();
const tagServices = new TagServices();

export default (app: Router) => {
  app.use("/tag", route);

  app.post(
    "/tag",
    ensureAuthenticated,
    ensureAdmin,
    async (req: Request, res: Response) => {
      const tag = req.body;
      const newTag = await tagServices.createTag(tag);

      return res.status(201).json(newTag);
    }
  );

  app.get(
    "/tag/all",
    ensureAuthenticated,
    async (req: Request, res: Response) => {
      const tags = await tagServices.listTags();
      return res.status(200).json(tags);
    }
  );

  app.delete("/tag", async (req: Request, res: Response) => {
    const { name } = req.body;
    await tagServices.deleteTag({ name });
    return res.status(204).json({});
  });
};
