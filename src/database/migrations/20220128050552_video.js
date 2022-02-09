exports.up = (knex) => {
	return knex.schema.createTable('video', (table) => {
		table.increments('id').primary().notNullable();
		table
			.string('screenshot_path')
			.defaultTo('/default/video_place_holder.jpeg');
		table.string('video_path').notNullable();
		table.string('username').notNullable();
		table.integer('user_id').notNullable();
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('video');
};
