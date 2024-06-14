import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('places').del();

    if (knex.client.config.client === 'pg') {
        await knex.raw('ALTER SEQUENCE places_id_seq RESTART WITH 1');
    }

    // Inserts seed entries
    await knex('places').insert([
        { userId: 1, latitude: 58.15, longitude: 65.74 },
        { userId: 1, latitude: 57.45, longitude: 65.34 },
        { userId: 2, latitude: 57.45, longitude: 65.34 },
    ]);
}
