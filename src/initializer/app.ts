import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { Server } from "http";
import routes from "../api";
import config from "../config";
import "express-async-errors";
import cors from "cors";

export default class ConfigServer {
  private server?: Server;

  constructor(private port = config.port_server, public app = express()) {}

  public init() {
    this.setupServer();
    this.setupRoutes();
  }

  private setupServer() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private setupRoutes() {
    this.app.use("/api", routes());
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
    });
  }
}
