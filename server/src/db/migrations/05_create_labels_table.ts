import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('labels', (table) => {
            table.increments('id').primary();
            table.string('name', 255).unique().notNullable();
            table.integer('userId').unsigned().index().references('id').inTable('users').nullable();
            table.timestamps();
        })
        .createTable('notes_labels', (table) => {
            table.increments('id').primary();
            table.integer('noteId').unsigned().index().references('id').inTable('notes').notNullable();
            table.integer('labelId').unsigned().index().references('id').inTable('labels').notNullable();
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notes_labels').dropTable('labels');
}
