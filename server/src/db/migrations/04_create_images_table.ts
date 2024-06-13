import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('images', (table) => {
        table.increments('id').primary();
        table.string('uri').notNullable();
        table.integer('noteId').unsigned().index().references('id').inTable('notes').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('images');
}
