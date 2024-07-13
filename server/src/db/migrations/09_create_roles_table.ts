import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable('roles', (table) => {
            table.increments('id').primary();
            table.string('name', 255).notNullable().unique();
        })
        .alterTable('users', (table) => {
            table
                .integer('roleId')
                .unsigned()
                .index()
                .references('id')
                .inTable('roles')
                .nullable()
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('users', (table) => {
            table.dropColumn('roleId');
        })
        .dropTable('roles');
}
