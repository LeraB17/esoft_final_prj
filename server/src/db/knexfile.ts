import type { Knex } from 'knex';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            connectionString: `postgresql://${process.env.POSTGRESQL_USER}:${process.env.POSTGRESQL_PASSWORD}@${process.env.POSTGRESQL_HOST}:${process.env.POSTGRESQL_PORT}/${process.env.POSTGRESQL_DBNAME}`,
        },
        pool: {
            min: Number(process.env.POSTGRESQL_POOL_MIN),
            max: Number(process.env.POSTGRESQL_POOL_MAX),
            idleTimeoutMillis: 10000,
        },
        migrations: {
            directory: './migrations',
            tableName: 'knex_migrations',
        },
        seeds: {
            directory: './seeds',
        },
    },
};

export default config;
