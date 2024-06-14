import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('publicity_statuses', (table) => {
            table.increments('id').primary();
            table.string('statusName', 255).notNullable().unique();
        })
        .createTable('notes', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable();
            table.text('text').notNullable();
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
                .integer('placeId')
                .unsigned()
                .index()
                .references('id')
                .inTable('places')
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table
                .integer('publicityStatusId')
                .unsigned()
                .index()
                .references('id')
                .inTable('publicity_statuses')
                .notNullable()
                .defaultTo(3)
                .onUpdate('CASCADE')
                .onDelete('SET DEFAULT');
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notes').dropTable('publicity_statuses');
}
