import { IncomingMessage, ServerResponse } from 'http';
import { AppRouter } from '../router/app.router';
import { ControllerFactory } from '../factory/controller.factory';

export class RequestHandler {

    handleRequest(request: IncomingMessage, response: ServerResponse) {
        let notFoundRoute;
        let controllerName = '';
        const route = AppRouter.findRoute(request.method, request.url);
        const errRoute = AppRouter.findExceptionHandlerRoute(500);
        if (!route) {
            notFoundRoute = AppRouter.findExceptionHandlerRoute(404);
            controllerName = notFoundRoute.controller;
        } else {
            controllerName = route.controller;
        }

        const controller = ControllerFactory.getController(controllerName, errRoute.controller);
        const action = controller[request.method.toLowerCase()];
        action(request, response);
    }
}
