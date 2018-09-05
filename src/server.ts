import { Server, createServer, IncomingMessage, ServerResponse } from 'http';
import querystring from 'querystring';

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
      const url = req.url;

      if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('hello world');
      } else if (url === '/users' && req.method === 'POST') {
        let body = '';
        req.on('data', (data) => {
            body += data;
            // request >= 1MB
            if (body.length >= 1e6) {
                // Flood attack
                req.connection.destroy();
                res.writeHead(413, { 'Content-Type': 'text/plain' });
                res.end();
            }
        });

        req.on('end', () => {
          const postBody = querystring.parse(body);
          res.writeHead(200, { 'Content-Type': 'text/json' });
          res.end(JSON.stringify(postBody));
        });
      }

    });
  }

  startServer(port: number): void {
    this.server.listen(port, 'localhost');
  }
}

new AppServer().startServer(3001);
