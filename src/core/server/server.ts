import { Server, createServer, IncomingMessage, ServerResponse } from 'http';
import { RequestHandler } from '../handlers/requestHandler';
import { Configuration } from '../../configuration/Configuration';

export class AppServer {
  private server: Server;

  constructor(config: Configuration) {
    this.server = this.initServer(config);
  }

  getServer(): Server {
    return this.server;
  }

  private initServer(config: Configuration): Server {
    return createServer(async (request: IncomingMessage, response: ServerResponse) => {
      const reqHandler = new RequestHandler(request, response);
      await reqHandler.handleRequest(config);
    });
  }

  startServer(host: string, port: string): void {
    console.debug(`starting server on ${host}:${port}`);
    this.server.listen(parseInt(port, 10), host);
  }
}
