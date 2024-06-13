import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('subscriptions', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().index().references('id').inTable('users').notNullable();
        table.integer('targetUserId').unsigned().index().references('id').inTable('users').notNullable();
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('subscriptions');
}
