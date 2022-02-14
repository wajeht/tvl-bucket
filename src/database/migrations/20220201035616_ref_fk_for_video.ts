exports.up = (knex: any) => {
  return knex.schema.table('video_details', (table: any) => {
    table.integer('video_id').references('id').inTable('video').onDelete('cascade').index();
  });
};

exports.down = (knex: any) => {
  return knex.schema.table('video_details', (table: any) => {
    table.dropColumn('video_id');
  });
};
