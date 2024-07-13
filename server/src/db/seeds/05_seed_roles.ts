import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('roles').del();

    if (knex.client.config.client === 'pg') {
        await knex.raw('ALTER SEQUENCE roles_id_seq RESTART WITH 1');
    }

    // Inserts seed entries
    await knex('roles').insert([{ name: 'USER' }, { name: 'ADMIN' }]);
}
