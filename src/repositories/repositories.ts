import { AppDataSource } from "../data-source";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export const userRepositoy = AppDataSource.getRepository(User);

export const tagRepositoy = AppDataSource.getRepository(Tag);
