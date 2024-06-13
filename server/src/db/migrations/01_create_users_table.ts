import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('nickname', 255).notNullable().unique();
        table.string('email', 255).notNullable().unique();
        table.string('password', 255).notNullable();
        table.string('avatar', 255).nullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}
