import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('labels').del();

    if (knex.client.config.client === 'pg') {
        await knex.raw('ALTER SEQUENCE labels_id_seq RESTART WITH 1');
    }

    // Inserts seed entries
    await knex('labels').insert([{ name: 'Надо сходить' }, { name: 'Сходил' }, { name: 'Другое' }]);
}
