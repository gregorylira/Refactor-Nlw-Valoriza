import { Request, Response, Router } from "express";
import { UserServices } from "../../services/user.services";

const route = Router();
const userService = new UserServices();

export default (app: Router) => {
  app.use("/user", route);

  app.post("/user", async (req: Request, res: Response) => {
    const { name, email, admin, password } = req.body;

    const newUser = await userService.createUser({
      name,
      email,
      admin,
      password,
    });

    return res.status(201).json(newUser);
  });

  app.get("/user/all", async (req, res) => {
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
};
