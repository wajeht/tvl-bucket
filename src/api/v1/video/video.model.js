const db = require('../../../../database/db.js');

class VideoModel {
	getVideo = (id) => {
		return db.select('*').from('video').where({ id });
	};

	getVideos = () => {
		return db.select('*').from('video');
	};

	postVideo = (video) => {
		return db
			.insert({
				screenshot_path: video.screenshot_path,
				video_path: video.video_path,
				user_id: video.user_id,
			})
			.into('video')
			.returning('*');
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
