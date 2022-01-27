class VideoModel {
	getVideo = (id) => {
		return db.select('*').from('video').where({ id });
	};

	getVideos = () => {
		return db.select('*').from('video');
	};

	postVideo = (object) => {
		return db.insert(object).into('video').where({ id });
	};

	updateVideo = (object) => {
		return db.update(object).from('video').where({ id });
	};

	deleteVideo = (id) => {
		return db.delete('*').from('video').where({ id });
	};
}

module.exports = new VideoModel();
