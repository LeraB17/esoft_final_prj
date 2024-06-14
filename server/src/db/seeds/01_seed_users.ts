import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    if (knex.client.config.client === 'pg') {
        await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    }

    // Inserts seed entries
    await knex('users').insert([
        { nickname: 'testuser1', email: 'test1@test.test', password: 'testtest' },
        { nickname: 'testuser2', email: 'test2@test.test', password: 'testtest' },
    ]);
}
