import 'jest';
import chai from 'chai';

import { RequestPayloadMiddleware } from '../src/core/middlewares/requestPayload.middleware';
import { HttpRequest } from '../src/core/server/httpRequest';
import { HttpResponse } from '../src/core/server/httpResponse';
import { IncomingMessage, ServerResponse } from 'http';
import { Socket } from 'net';

describe('RequestPayloadMiddleware Test', () => {
    describe('process', () => {
        it('should add data sent by client to request body', async () => {
            // Arrange
            const requestPayloadMiddleware = new RequestPayloadMiddleware();
            const message = new IncomingMessage(new Socket());
            const request = new HttpRequest(message);
            const response = new HttpResponse(null);

            // Act
            const promise = requestPayloadMiddleware.process(request, response);

            message.emit('data', `{"name": "test"}`);
            message.emit('end');
            await promise;

            // Assert
            chai.assert.deepStrictEqual(JSON.parse(`{"name": "test"}`), request.body);

        });

        it('should reject if data sent by client is not valid JSON', async () => {
            // Arrange
            const requestPayloadMiddleware = new RequestPayloadMiddleware();
            const message = new IncomingMessage(new Socket());
            const request = new HttpRequest(message);
            const response = new HttpResponse(null);

            try {
                    // Act
                    const promise = requestPayloadMiddleware.process(request, response);

                    message.emit('data', `{"name": }`);
                    message.emit('end');
                    await promise;
                    throw('RequestPayloadMiddleware: test case failed');
            } catch (e) {
                 chai.assert.equal('SyntaxError: Unexpected token } in JSON at position 9', e + '');
            }
        });

        it('should reject if data sent by client is >= 1mb', async () => {
            // Arrange
            const requestPayloadMiddleware = new RequestPayloadMiddleware();
            const message = new IncomingMessage(new Socket());
            const request = new HttpRequest(message);
            const response = new HttpResponse(new ServerResponse(message));

            try {
                    // Act
                    const promise = requestPayloadMiddleware.process(request, response);

                    for (let i = 0; i < 100000; i = i + 1) {
                        message.emit('data', `{"name": "random","test": "data"}`);
                    }
                    message.emit('end');
                    await promise;
                    throw('RequestPayloadMiddleware: test case failed');
            } catch (e) {
                 chai.assert.equal('request terminated due to flood request', e + '');
                 chai.assert.equal(response.response.statusCode, 413);
            }
        });
    });

    describe('cleanUp', () => {
        it('should clean up request body', async () => {
            // Arrange
            const requestPayloadMiddleware = new RequestPayloadMiddleware();
            const message = new IncomingMessage(new Socket());
            const request = new HttpRequest(message);
            const response = new HttpResponse(null);

            // Act
            const promise = requestPayloadMiddleware.process(request, response);

            message.emit('data', `{"name": "test"}`);
            message.emit('end');
            await promise;

            // Assert
            chai.assert.deepStrictEqual(JSON.parse(`{"name": "test"}`), request.body);

            // Act
            requestPayloadMiddleware.cleanUp();
            message.emit('data', `{"message": "hello"}`);
            message.emit('end');
            await promise;

            // Assert
            chai.assert.deepStrictEqual(JSON.parse(`{"message": "hello"}`), request.body);
        });
    });
});
