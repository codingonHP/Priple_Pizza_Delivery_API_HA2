import { AppServer } from './core/server/server';
import { ApplicationRoutes } from './routes/application.route';
import { AppRouter } from './core/router/app.router';
import { Configuration } from './configuration/Configuration';

export class Application {
    constructor() {
        AppRouter.registerRoutes(ApplicationRoutes.APP_ROUTES, ApplicationRoutes.APP_EXCEPTION_ROUTES);
    }

    async start(): Promise<void> {
        const appServer = new AppServer();
        const config = await Configuration.getConfiguration();
        appServer.startServer(config.server.host, config.server.port);
    }
}

new Application().start();
