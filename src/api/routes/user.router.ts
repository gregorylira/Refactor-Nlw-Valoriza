import { Request, Response, Router } from "express";
import { AuthenticateUserService } from "../../services/authenticate.services";
import { UserServices } from "../../services/user.services";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { uploadImage } from "../../services/firebase";

const multer = require("multer");

const route = Router();
const userService = new UserServices();
const authenticateUserService = new AuthenticateUserService();

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024 * 1024,
});

export default (app: Router) => {
  app.use("/user", route);

  app.post(
    "/user",
    Multer.single("image"),
    uploadImage,
    async (req: Request, res: Response) => {
      const { name, email, admin, password } = req.body;
      const image_url = req.file;

      const newUser = await userService.createUser({
        name,
        email,
        admin,
        password,
        image_url: image_url.firebaseUrl,
      });

      return res.status(201).json(newUser);
    }
  );

  app.get("/user/all", ensureAuthenticated, async (req, res) => {
    const users = await userService.listUsers();
    return res.status(200).json(users);
  });

  app.delete("/user", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const message = await userService.deleteUser({ email, password });
    return res.status(204).json({ message: message.message });
  });

  app.put("/user/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name, email, password } = req.body;

    const user = await userService.modifyUser({ id, name, email, password });

    return res.status(201).json({ user });
  });

  app.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await authenticateUserService.execute({ email, password });

    return res.status(200).json(token);
  });
};
