exports.up = (knex) => {
	return knex.schema.createTable('video_details', (table) => {
		table.increments('id').primary().notNullable();
		table.string('filename').notNullable();
		table.string('size').notNullable();
		table.string('mimetype').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('video_details');
};
