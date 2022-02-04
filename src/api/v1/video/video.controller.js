const VideoModel = require('./video.model.js');
const { StatusCodes } = require('http-status-codes');

class VideoController {
	getVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.getVideo(id);

		if (!video.length) {
			return res.status(StatusCodes.NOT_FOUND).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: `Could not find any resource with id: ${id}!`,
			});
		}

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'A single video has returned',
			data: video,
		});
	};

	getVideos = async (req, res, next) => {
		const videos = await VideoModel.getVideos();

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'Many videos have returned',
			data: videos,
		});
	};

	postVideo = async (req, res, next) => {
		const video = await VideoModel.postVideo(req.body, req.file);

		res.status(StatusCodes.CREATED).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'A single video has posted',
			data: video,
		});
	};

	updateVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.updateVideo(id, req.body);

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'A single video has updated',
			data: video,
		});
	};

	deleteVideo = async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.deleteVideo(id);

		if (!video.length) {
			return res.status(StatusCodes.NOT_FOUND).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: `Could not find any resource with id: ${id}!`,
			});
		}

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'A single video has deleted',
			data: video,
		});
	};
}

module.exports = new VideoController();
