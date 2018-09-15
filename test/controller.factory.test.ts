import 'jest';
import chai from 'chai';

import { ControllerFactory } from '../src/core/factory/controller.factory';
import { Configuration } from '../src/configuration/Configuration';

describe('Controller Factory Test', () => {
    describe('getController', () => {
        it('should return instance of controller if it exists', async (done) => {
            // Arrange
            const config = await Configuration.getConfiguration();

            // Act
            const instance = ControllerFactory.getController('home.controller', config);

            // Assert
            chai.assert.isDefined(instance);
            chai.assert.isObject(instance);
            chai.assert.isNotNull(instance);
            chai.assert.isFunction(instance.get);
            done();
        });

        it('should throw exception if it controller does not exist', async () => {
            // Arrange
            const config = await Configuration.getConfiguration();

            // Act & Assert
            chai.assert.throws(() => {
                ControllerFactory.getController('random.controller', config);
            });
        });
    });
});
