import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { default1657838292716 } from "./migrations/1657838292716-default";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123456789",
  database: "valoriza",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [default1657838292716],
  subscribers: [],
});
