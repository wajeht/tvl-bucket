exports.up = (knex) => {
	return knex.schema.createTable('video_details', (table) => {
		table.increments('id').primary().notNullable();
		table.string('name').notNullable();
		table.string('size').notNullable();
		table.string('type').notNullable();
		table
			.integer('video_id')
			.references('id')
			.inTable('video')
			.onDelete('cascade')
			.index();
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('video_details');
};
