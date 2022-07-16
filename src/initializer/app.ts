import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import routes from "../api";
import config from "../config";
import "express-async-errors";
import cors from "cors";
import { swaggerDocs } from "../api/utils/swagger";

import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

export default class ConfigServer {
  private server?: Server;

  constructor(private port = config.port_server, public app = express()) {}

  public async init() {
    this.setupServer();
    this.setupRoutes();
    await this.setupDatabase();
  }

  private setupServer() {
    const cors = require("cors");
    this.app.use(
      cors({
        origin: ["localhost", "26.100.58.57"],
      })
    );
    // this.app.use(cors());
    this.app.use(express.json());
  }

  private setupDatabase() {
    AppDataSource.initialize()
      // .then(async () => {
      //   console.log("Inserting a new user into the database...");
      //   const user = new User();
      //   user.firstName = "Timber";
      //   user.lastName = "Saw";
      //   user.age = 25;
      //   await AppDataSource.manager.save(user);
      //   console.log("Saved a new user with id: " + user.id);

      //   console.log("Loading users from the database...");
      //   const users = await AppDataSource.manager.find(User);
      //   console.log("Loaded users: ", users);

      //   console.log(
      //     "Here you can setup and run express / fastify / any other framework."
      //   );
      // })
      .catch((error) => console.log(error));
  }

  private setupRoutes() {
    this.app.use("/v1/api", routes());
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof Error) {
          return response.status(400).json({
            error: err.message,
          });
        }

        return response.status(500).json({
          status: "error",
          message: "Internal Server Error",
        });
      }
    );
  }

  public start() {
    this.server = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
      swaggerDocs(this.app, this.port);
    });
  }
}
