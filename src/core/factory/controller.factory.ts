export class ControllerFactory {
    static getController(name: string): any {
        try {
            const controllerModule = require(`../../controllers/${name}`);
            return this.instantiateController(name, controllerModule);
        } catch (e) {
            throw(e);
        }
    }

    private static instantiateController(name: string, module: any) {
        const controllerClassName = this.convertToTitleCase(name);
        return new module[controllerClassName]();
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
