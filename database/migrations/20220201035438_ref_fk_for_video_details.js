exports.up = (knex) => {
	return knex.schema.table('video', (table) => {
		table
			.integer('video_details_id')
			.references('id')
			.inTable('video_details')
			.onDelete('cascade')
			.index();
	});
};

exports.down = (knex) => {
	return knex.schema.table('video', (table) => {
		table.dropColumn('video_details_id');
	});
};
