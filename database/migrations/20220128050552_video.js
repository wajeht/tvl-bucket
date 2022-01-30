exports.up = (knex) => {
	return knex.schema.createTable('video', (table) => {
		table.increments('id').primary().notNullable();
		table.string('screenshot_path').notNullable();
		table.string('video_path').notNullable();
		table.string('username').notNullable();
		table.integer('user_id').notNullable();
		table
			.integer('video_details_id')
			.references('id')
			.inTable('video_details')
			.onDelete('cascade')
			.index();
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('video');
};
