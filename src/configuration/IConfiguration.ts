import { DatabaseConfiguration } from './DatabaseConfiguration';
import { Server } from './Server';

export interface IConfiguration {
    database: DatabaseConfiguration;
    environment: string;
    server: Server;
}
