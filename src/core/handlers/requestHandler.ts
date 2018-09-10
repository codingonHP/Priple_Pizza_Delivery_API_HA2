import { AppRouter } from '../router/app.router';
import { ControllerFactory } from '../factory/controller.factory';
import { HttpRequest } from '../server/httpRequest';
import { HttpResponse } from '../server/httpResponse';
import { Route, ExceptionRoute } from '../router/route';
import { IMiddleware } from '../middlewares/IMiddleware';
import { IncomingMessage, ServerResponse } from 'http';

// TODO: needs cleaning
export class RequestHandler {
    private httpRequest: HttpRequest;
    private httpResponse: HttpResponse;

    constructor(request: IncomingMessage, response: ServerResponse) {
        this.httpRequest = new HttpRequest(request);
        this.httpResponse = new HttpResponse(response);
    }

    async handleRequest() {
        let notFoundRoute;
        let controllerName = '';
        const route = AppRouter.findRoute(this.httpRequest.request.method, this.httpRequest.request.url);
        const errRoute = AppRouter.findExceptionHandlerRoute(500);
        if (!route) {
            notFoundRoute = AppRouter.findExceptionHandlerRoute(404);
            controllerName = notFoundRoute.controller;
        } else {
            controllerName = route.controller;
        }

        const controller = ControllerFactory.getController(controllerName, errRoute.controller);
        const action = controller[this.httpRequest.request.method.toLowerCase()].bind(controller);
        await this.runMiddlewares(route || notFoundRoute || errRoute, this.httpRequest, this.httpResponse);
        action(this.httpRequest, this.httpResponse);
    }

    private runMiddlewares(route: Route | ExceptionRoute, request: HttpRequest, response: HttpResponse): Promise<any> {
        return Promise.all(
            route.middlewares.map((middleware: IMiddleware) => {
              return middleware.process(request, response).then(() => middleware.cleanUp());
            })
        );
    }
}
