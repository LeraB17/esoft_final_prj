import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('images', (table) => {
        table.increments('id').primary();
        table.string('uri').notNullable();
        table
            .integer('noteId')
            .unsigned()
            .index()
            .references('id')
            .inTable('notes')
            .notNullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('images');
}
