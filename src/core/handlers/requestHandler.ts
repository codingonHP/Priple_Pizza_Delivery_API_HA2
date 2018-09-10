import { AppRouter } from '../router/app.router';
import { ControllerFactory } from '../factory/controller.factory';
import { HttpRequest } from '../server/httpRequest';
import { HttpResponse } from '../server/httpResponse';
import { Route } from '../router/route';
import { IMiddleware } from '../middlewares/IMiddleware';
import { IncomingMessage, ServerResponse } from 'http';

export class RequestHandler {
    private httpRequest: HttpRequest;
    private httpResponse: HttpResponse;

    constructor(request: IncomingMessage, response: ServerResponse) {
        this.httpRequest = new HttpRequest(request);
        this.httpResponse = new HttpResponse(response);
    }

    async handleRequest() {
        let controllerName = '';
        const route = AppRouter.findRoute(this.httpRequest.request.method, this.httpRequest.request.url);
        if (route) {
            controllerName = route.controller;
        } else {
            throw('RouteNotFound');
        }

        const controller = ControllerFactory.getController(controllerName);
        const action = controller[this.httpRequest.request.method.toLowerCase()].bind(controller);
        await this.runMiddlewares(route, this.httpRequest, this.httpResponse);
        action(this.httpRequest, this.httpResponse);
    }

    private runMiddlewares(route: Route, request: HttpRequest, response: HttpResponse): Promise<any> {
        return Promise.all(
            route.middlewares.map((middleware: IMiddleware) => {
              return middleware.process(request, response).then(() => middleware.cleanUp());
            })
        );
    }
}
