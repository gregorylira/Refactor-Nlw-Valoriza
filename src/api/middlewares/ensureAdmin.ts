import { NextFunction, Request, Response } from "express";
import { userRepositoy } from "../../repositories/repositories";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { user_id } = request;
  const id = Number(user_id);
  const admin = await userRepositoy.findOneBy({ id });

  if (admin.admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unauthorized",
  });
}
