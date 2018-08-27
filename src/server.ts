import { Server, createServer } from 'http';

export class AppServer {
  private server: Server;

  constructor() {
    this.server = this.initServer();
  }

  getServer(): Server {
    return this.server;
  }

  private initServer(): Server {
    return createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('hello world');
    });
  }

  startServer(port: number): void {
    this.server.listen(port, 'localhost');
  }
}

new AppServer().startServer(3001);
