import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('places', (table) => {
            table.unique(['userId', 'latitude', 'longitude'], { indexName: 'unique_user_place' });
        })
        .alterTable('notes_labels', (table) => {
            table.unique(['noteId', 'labelId'], { indexName: 'unique_note_label' });
        })
        .alterTable('notes_shortcuts', (table) => {
            table.unique(['userId', 'noteId'], { indexName: 'unique_note_shortcut' });
        })
        .alterTable('subscriptions', (table) => {
            table.unique(['userId', 'targetUserId'], { indexName: 'unique_subscription' });
        });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable('places', (table) => {
            table.dropUnique(['userId', 'latitude', 'longitude'], 'unique_user_place');
        })
        .alterTable('notes_labels', (table) => {
            table.dropUnique(['noteId', 'labelId'], 'unique_note_label');
        })
        .alterTable('notes_shortcuts', (table) => {
            table.dropUnique(['userId', 'noteId'], 'unique_note_shortcut');
        })
        .alterTable('subscriptions', (table) => {
            table.dropUnique(['userId', 'targetUserId'], 'unique_subscription');
        });
}
