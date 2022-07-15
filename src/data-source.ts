import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";
import { default1657838292716 } from "./migrations/1657838292716-default";
import { default1657886973502 } from "./migrations/1657886973502-default";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456789",
  database: "valoriza",
  synchronize: true,
  logging: false,
  entities: [User, Tag],
  migrations: [default1657838292716, default1657886973502],
  subscribers: [],
});
