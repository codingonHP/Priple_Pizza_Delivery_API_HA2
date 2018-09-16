import 'jest';
import chai from 'chai';
import sinon from 'sinon';

import { Application } from '../src/app';
import { AppRouter } from '../src/core/router/app.router';
import { ApplicationRoutes } from '../src/routes/application.route';
import { AppServer } from '../src/core/server/server';
import { Fake } from './test-util/fake';

describe('Application Test', () => {
    describe('#constructor', () => {
        describe('when Application is created', () => {
            it('should register routes from APP_ROUTES for application', () => {
                // Arrange
                const testSandbox = sinon.createSandbox();
                const appRouterRegisterRoutesSpy = testSandbox.spy(AppRouter, 'registerRoutes');

                // Act
                new Application();

                // Assert
                chai.assert.equal(appRouterRegisterRoutesSpy.callCount, 1);
                appRouterRegisterRoutesSpy.calledWithExactly(ApplicationRoutes.APP_ROUTES);

                // restore
                testSandbox.reset();
            });
        });
    });

    describe('#start', () => {
        describe('when called from Application instance', () => {
            it('should start server with configuration', async (done) => {
                // Arrange
                const testSandbox = sinon.createSandbox();
                const config = Fake.getFakeConfiguration();
                const appServerStub = testSandbox.stub().returns(new AppServer(config));
                const appServer = appServerStub();
                const startServerSpy = testSandbox.spy(appServer, 'startServer');

                // Act
                await new Application().start(appServer, config);

                // Assert
                startServerSpy.calledWithExactly(config.server.host, config.server.port);
                done();

                // restore
                testSandbox.reset();
            });
        });
    });
});
