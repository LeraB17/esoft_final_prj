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
            table.float('latitude').notNullable();
            table.float('longitude').notNullable();
            table.integer('userId').unsigned().index().references('id').inTable('users').notNullable();
            table.integer('publicityStatusId').unsigned().index().references('id').inTable('publicity_statuses').notNullable();
            table.timestamps();
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('notes').dropTable('publicity_statuses');
}
