exports.up = (knex) => {
	return knex.schema.table('video_details', (table) => {
		table
			.integer('video_id')
			.references('id')
			.inTable('video')
			.onDelete('cascade')
			.index();
	});
};

exports.down = (knex) => {
	return knex.schema.table('video_details', (table) => {
		table.dropColumn('video_id');
	});
};
