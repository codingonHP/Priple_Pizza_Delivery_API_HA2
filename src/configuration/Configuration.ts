import fs from 'fs';

import { IConfiguration } from './IConfiguration';
import { DatabaseConfiguration } from './DatabaseConfiguration';

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
    return new Promise<Configuration>((resolve, reject) => {
      fs.readFile('./src/configuration/config.json', async (err, configData: Buffer) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const baseConfig: Configuration = this.toConfiguration(JSON.parse(configData.toString('utf-8')));
          const config: Configuration = await this.updateWithCurrentEnvironmentConfiguration(
            baseConfig,
            currEnv,
          );
          resolve(config);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  private updateWithCurrentEnvironmentConfiguration(
    baseConfig: Configuration,
    env: string,
  ): Promise<Configuration> {
    const currEnv = env || '';

    return new Promise<Configuration>((resolve, reject) => {
      if (!env) {
        resolve(baseConfig);
        return;
      }

      fs.readFile(`./src/configuration/config.${currEnv}.json`, (err, configData: Buffer) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const envConfig: Configuration = this.toConfiguration(JSON.parse(configData.toString('utf-8')));
          const config: Configuration = Object.assign({}, baseConfig, envConfig);
          resolve(config);
        } catch (e) {
          reject(e);
        }
      });
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
