import "reflect-metadata";
import { DataSource } from "typeorm";
import { Compliment } from "./entities/Compliement";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { NewDB1657977703346 } from "./migrations/1657977703346-NewDB";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456789",
  database: "valoriza",
  synchronize: true,
  logging: false,
  entities: [User, Tag, Compliment],
  migrations: [NewDB1657977703346],
  subscribers: [],
});
