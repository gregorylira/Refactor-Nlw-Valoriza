import ConfigServer from "./initializer/app";

class Server {
  public static async start(): Promise<void> {
    const app = new ConfigServer();
    await app.init();
    app.start();
  }
}

Server.start();
