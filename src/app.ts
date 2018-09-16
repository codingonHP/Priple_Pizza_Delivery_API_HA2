import { AppServer } from './core/server/server';
import { ApplicationRoutes } from './routes/application.route';
import { AppRouter } from './core/router/app.router';
import { IConfiguration } from './configuration/IConfiguration';

export class Application {
    constructor() {
        AppRouter.registerRoutes(ApplicationRoutes.APP_ROUTES);
    }

    async start(appServer:  AppServer, config: IConfiguration): Promise<void> {
        appServer.startServer(config.server.host, config.server.port);
    }
}
