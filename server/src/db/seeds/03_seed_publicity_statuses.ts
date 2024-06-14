import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('publicity_statuses').del();

    if (knex.client.config.client === 'pg') {
        await knex.raw('ALTER SEQUENCE publicity_statuses_id_seq RESTART WITH 1');
    }

    // Inserts seed entries
    await knex('publicity_statuses').insert([
        { statusName: 'Для всех' },
        { statusName: 'Для друзей' },
        { statusName: 'Для меня' },
    ]);
}
