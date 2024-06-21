import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('refresh_tokens', (table) => {
        table.increments('id').primary();
        table
            .integer('userId')
            .unsigned()
            .index()
            .references('id')
            .inTable('users')
            .nullable()
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('refreshToken', 255).notNullable();
        table.string('fingerprint', 255).notNullable();
        table.timestamp('expiresAt').notNullable();
        table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('refresh_tokens');
}
