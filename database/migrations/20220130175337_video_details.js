exports.up = (knex) => {
	return knex.schema.createTable('video_details', (table) => {
		table.increments('id').primary().notNullable();
		table.string('filename').notNullable();
		table.integer('size').notNullable();
		table.string('mimetype').notNullable();
		table.string('absolute_video_path').notNullable();
		table
			.string('absolute_screenshot_path')
			.defaultTo('/default/video_place_holder.jpeg');
		table.timestamps(true, true);
	});
};

exports.down = (knex) => {
	return knex.schema.dropTable('video_details');
};
