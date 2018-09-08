import { Server, createServer, IncomingMessage, ServerResponse } from 'http';
import { RequestHandler } from '../handlers/requestHandler';

export class AppServer {
  private server: Server;

  constructor() {
    this.server = this.initServer();
  }

  getServer(): Server {
    return this.server;
  }

  private initServer(): Server {
    return createServer((req: IncomingMessage, res: ServerResponse) => {
      const reqHandler = new RequestHandler();
      reqHandler.handleRequest(req, res);
    });
  }

  startServer(host: string, port: string): void {
    console.debug(`starting server on ${host}:${port}`);
    this.server.listen(parseInt(port, 10), host);
  }
}
