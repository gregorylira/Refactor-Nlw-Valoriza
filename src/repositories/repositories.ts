import { AppDataSource } from "../data-source";
import { Compliment } from "../entities/Compliement";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";

export const userRepositoy = AppDataSource.getRepository(User);

export const tagRepositoy = AppDataSource.getRepository(Tag);

export const complimentRepository = AppDataSource.getRepository(Compliment);
