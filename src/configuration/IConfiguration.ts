import { DatabaseConfiguration } from './DatabaseConfiguration';

export interface IConfiguration {
    database: DatabaseConfiguration;
    environment: string;
}
