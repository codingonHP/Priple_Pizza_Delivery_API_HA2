import { IConfiguration } from '../../configuration/IConfiguration';

export class ControllerFactory {
    static getController(name: string, config: IConfiguration): any {
        try {
            const controllerModule = require(`../../controllers/${name}`);
            return this.instantiateController(name, controllerModule, config);
        } catch (e) {
            throw(e);
        }
    }

    private static instantiateController(name: string, module: any, config: IConfiguration) {
        const controllerClassName = this.convertToTitleCase(name);
        return new module[controllerClassName](config);
    }

    private static convertToTitleCase(value: string): string {
        let finalValue = '';
        const valueArry = value.split('.');
        for (let item of valueArry) {
            item = this.capitalizeFirstLetter(item);
            finalValue += item;
        }

        return finalValue;
    }

    private static capitalizeFirstLetter(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
}
