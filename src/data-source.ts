import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { default1657820887902 } from "./migrations/1657820887902-default";

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
  migrations: [default1657820887902],
  subscribers: [],
});
