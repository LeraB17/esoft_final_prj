import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('places', (table) => {
        table.string('name', 255).notNullable().defaultTo('Без названия');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('places', (table) => {
        table.dropColumn('name');
    });
}
