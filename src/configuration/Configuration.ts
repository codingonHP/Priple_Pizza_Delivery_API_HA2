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
          this.instance = await config.loadConfiguration(env);
          resolve(this.instance);
          return;
        } catch (e) {
          reject(e);
          return;
        }
      }
      resolve(this.instance);
    });
  }

  static reset(): void {
    this.instance = null;
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
    baseConfig: any,
    env: string,
  ): Promise<any> {
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
          const envConfig: Configuration = JSON.parse(configData.toString('utf-8'));
          const config: Configuration = this.toConfiguration(Object.assign({}, baseConfig, envConfig));
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
