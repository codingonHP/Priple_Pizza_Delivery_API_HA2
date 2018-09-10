import { IMiddleware } from './IMiddleware';
import { HttpRequest } from '../server/httpRequest';
import { HttpResponse } from '../server/httpResponse';

export class RequestPayloadMiddleware implements IMiddleware{

    private body: string = '';
    process(request: HttpRequest, response: HttpResponse): Promise<any> {
        return new Promise((resolve, reject) => {
            this.onDataArrival(request, response, reject);
            this.onDataReadEnd(request, resolve, reject);
        });
    }

    cleanUp(): void {
        this.body = '';
    }

    private onDataArrival(req: HttpRequest, res: HttpResponse, reject: any) {
        req.request.on('data', (data) => {
            this.body += data;
            if (this.isFloodAttack()) {
                this.endRequest(req, res, reject);
            }
        });
    }

    private onDataReadEnd(httpRequest: HttpRequest, resolve: any, reject: any) {
        httpRequest.request.on('end', () => {
            try {
                const postBody = JSON.parse(this.body);
                httpRequest.body = postBody;
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    }

    private isFloodAttack(): boolean {
        // request >= 1MB
        if (this.body.length >= 1e6) {
            // Flood attack
            return true;
        }
        return false;
    }

    private endRequest(req: HttpRequest, res: HttpResponse, reject: any) {
        req.request.connection.destroy();
        res.response.writeHead(413, { 'Content-Type': 'text/plain' });
        res.response.end();
        reject('request terminated due to flood request');
    }
}
