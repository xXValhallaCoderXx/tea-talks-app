import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/users/user.entity';
export interface IDatabaseConfigAttributes {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  autoLoadModels?: boolean;
}

export interface IDatabaseConfig {
  development: IDatabaseConfigAttributes;
  test: IDatabaseConfigAttributes;
  production: IDatabaseConfigAttributes;
}

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "teatalk",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    // autoLoadModels: true,
  },
  test: {
    username: "username",
    password: "password",
    database: "db-name",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
  production: {
    username: "username",
    password: "password",
    database: "db-name",
    host: "localhost",
    port: 5432,
    dialect: "postgres",
  },
};


export const databaseProviders = [{
    provide: "SEQUELIZE",
    useFactory: async () => {
        let config;
        switch (process.env.NODE_ENV) {
        case "development":
           config = databaseConfig.development;
           break;
        case "test":
           config = databaseConfig.test;
           break;
        case "production":
           config = databaseConfig.production;
           break;
        default:
           config = databaseConfig.development;
        }
        console.log("CONFIG: ", config);
        const sequelize = new Sequelize(config);
        sequelize.addModels([User]);
        await sequelize.sync();
        return sequelize;
    },
}];