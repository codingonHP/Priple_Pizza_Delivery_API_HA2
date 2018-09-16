import { Application } from './app';
import { Configuration } from './configuration/Configuration';
import { AppServer } from './core/server/server';

function startApplication() {
    Configuration.getConfiguration().then((config) => {
        const appServer = new AppServer(config);
        new Application().start(appServer, config);
    });
}

startApplication();
