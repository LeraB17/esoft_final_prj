import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('notes_shortcuts', (table) => {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table
            .integer('noteId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('SET NULL');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notes_shortcuts');
}
