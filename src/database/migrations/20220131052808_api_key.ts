exports.up = (knex: any) => {
  return knex.schema.createTable('api_key', (table: any) => {
    table.increments('id').primary().notNullable();
    table.string('key').notNullable();
    table.string('hashed_key').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = (knex: any) => {
  return knex.schema.dropTable('api_key');
};
