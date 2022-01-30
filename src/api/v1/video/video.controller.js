const VideoModel = require('./video.model.js');
class VideoController {
	getVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.getVideo(id);

		if (!video.length) {
			return res.status(404).json({
				request_url: req.originalUrl,
				message: 'Not found',
				data: [],
			});
		}

		res.status(200).json({
			request_url: req.originalUrl,
			message: 'A single video has returned',
			data: video,
		});
	};

	getVideos = async (req, res, next) => {
		const videos = await VideoModel.getVideos();

		res.status(200).json({
			request_url: req.originalUrl,
			message: 'Many videos have returned',
			data: videos,
		});
	};

	postVideo = async (req, res, next) => {
		const video = await VideoModel.postVideo(req.body);

		res.status(201).json({
			request_url: req.originalUrl,
			message: 'A single video has posted',
			data: video,
		});
	};

	updateVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.updateVideo(id, req.body);

		res.status(201).json({
			request_url: req.originalUrl,
			message: 'A single video has updated',
			data: video,
		});
	};

	deleteVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.deleteVideo(id);

		res.status(201).json({
			request_url: req.originalUrl,
			message: 'A single video has deleted',
			data: video,
		});
	};
}

module.exports = new VideoController();
