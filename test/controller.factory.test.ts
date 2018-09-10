import 'jest';
import chai from 'chai';
import sinon from 'sinon';

import { ControllerFactory } from '../src/core/factory/controller.factory';

describe('Controller Factory Test', () => {
    describe('getController', () => {
        it('should return instance of controller if it exists', () => {
            // Act
            const instance = ControllerFactory.getController('home.controller');

            // Assert
            chai.assert.isDefined(instance);
            chai.assert.isObject(instance);
            chai.assert.isNotNull(instance);
            chai.assert.isFunction(instance.get);
        });

        it('should throw exception if it controller does not exist', () => {
            // Arrange
            const getControllerSpy = sinon.spy(ControllerFactory, 'getController');

            try {
                // Act
                ControllerFactory.getController('random.controller');
            } catch (e) { }

            // Assert
            const res = getControllerSpy.threw();
            chai.assert.isTrue(res);
        });
    });
});
