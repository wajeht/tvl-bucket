const db = require('../../../../database/db.js');

class VideoModel {
	getVideo = (id) => {
		return db.select('*').from('video').where({ id });
	};

	getVideos = () => {
		return db.select('*').from('video');
	};

	postVideo = (body, video) => {
		return db
			.insert({
				username: body.username,
				user_id: body.user_id,
				video_path: video.path.slice(video.path.indexOf('/upload')),
			})
			.into('video')
			.returning('*')
			.then(async (res) => {
				const [row] = res;
				const x = await db
					.insert({
						filename: video.filename,
						size: video.size,
						mimetype: video.mimetype,
						video_id: row.id,
						absolute_video_path: video.path,
					})
					.into('video_details');
				return row;
			});
	};

	updateVideo = (id, video) => {
		return db
			.update({
				screenshot_path: video.screenshot_path,
				video_path: video.video_path,
			})
			.from('video')
			.where({ id })
			.returning('*');
	};

	deleteVideo = (id) => {
		return db.del().from('video').where({ id }).returning('*');
	};
}

module.exports = new VideoModel();
