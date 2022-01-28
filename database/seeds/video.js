exports.seed = (knex) => {
	return knex('video')
		.del()
		.then(() => {
			return knex('video').insert([
				{
					screenshot_path: '/Users/jaw/dev/screenshot/squat.jpg',
					video_path: '/Users/jaw/dev/screenshot/squat.mp4',
          user_id: 1,
				},
				{
					screenshot_path: '/Users/jaw/dev/screenshot/bench.jpg',
					video_path: '/Users/jaw/dev/screenshot/bench.mp4',
          user_id: 1,
				},
				{
					screenshot_path: '/Users/jaw/dev/screenshot/dead.jpg',
					video_path: '/Users/jaw/dev/screenshot/dead.mp4',
          user_id: 1,
				},
			]);
		});
};
