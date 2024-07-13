import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('places', (table) => {
        table
            .string('type', 255)
            .notNullable()
            .defaultTo('other')
            .checkIn(['house', 'street', 'transport', 'vegetation', 'hydro', 'other']);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('places', (table) => {
        table.dropColumn('type');
    });
}
