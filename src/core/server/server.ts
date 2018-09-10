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
    return createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const reqHandler = new RequestHandler(request, response);
      await reqHandler.handleRequest();
    });
  }

  startServer(host: string, port: string): void {
    console.debug(`starting server on ${host}:${port}`);
    this.server.listen(parseInt(port, 10), host);
  }
}
