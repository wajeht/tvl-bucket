exports.up = (knex) => {
	return knex.schema.createTable('api_key', (table) => {
		table.increments('id').primary().notNullable();
		table.string('key').notNullable();
		table.string('hashed_key').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('api_key');
};
