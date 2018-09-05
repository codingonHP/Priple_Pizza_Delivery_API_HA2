import { IConfiguration } from './IConfiguration';
import { DatabaseConfiguration } from './DatabaseConfiguration';
import { File } from '../util/file';

export class Configuration implements IConfiguration {
  private static instance: Configuration;
  private constructor() {}

  database: DatabaseConfiguration = new DatabaseConfiguration();
  environment: string = '';

  static async getConfiguration(env?: string): Promise<Configuration> {
    return new Promise<Configuration>(async (resolve, reject) => {
      if (!Configuration.instance) {
        const config = new Configuration();
        try {
          Configuration.instance = await config.loadConfiguration(env);
          resolve(Configuration.instance);
        } catch (e) {
          reject(e);
        }
      } else {
        resolve(Configuration.instance);
      }
    });
  }

  static reset(): void {
    Configuration.instance = null;
  }

  private loadConfiguration(env: string): Promise<Configuration> {
    const currEnv = env || '';
    return new Promise<Configuration>(async (resolve, reject) => {
      try {
        const baseConfigFileContent = await File.readFileAsyc('./src/configuration/config.json');
        const baseConfig: Configuration = this.toConfiguration(JSON.parse(baseConfigFileContent));
        const finalConfig: Configuration = await this.updateWithCurrentEnvironmentConfiguration(
          baseConfig,
          currEnv,
        );
        resolve(finalConfig);
      } catch (e) {
        reject(e);
      }
    });
  }

  private updateWithCurrentEnvironmentConfiguration(baseConfig: Configuration, env: string): Promise<Configuration> {
    const currEnv = env || '';

    return new Promise<Configuration>(async(resolve, reject) => {
      if (!currEnv) {
        resolve(baseConfig);
        return;
      }

      try {
        const envFileContent = await File.readFileAsyc(`./src/configuration/config.${currEnv}.json`);
        const envConfig: Configuration = this.toConfiguration(JSON.parse(envFileContent));
        const finalConfig: Configuration = Object.assign({}, baseConfig, envConfig);
        resolve(finalConfig);
      } catch (e) {
        reject(e);
      }
    });
  }

  private toConfiguration(config: any): Configuration {
    for (const prop in this) {
      this.loadSection(prop, config);
    }
    return this;
  }

  private loadSection(section: string, config: any) {
    const part = config[section];
    if (!part) {
      return;
    }

    (<any>this)[section] = config[section as keyof string];
  }
}
