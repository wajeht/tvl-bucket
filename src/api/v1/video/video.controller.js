const VideoModel = require('./video.model.js');
const { StatusCodes } = require('http-status-codes');
const { asyncHandler } = require('../../../middlewares/async-handler.js');
const Screenshot = require('../../../../utils/screenshot.js');

class VideoController {
	getVideo = asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.getVideo(id);

		if (!video.length) {
			return res.status(StatusCodes.NOT_FOUND).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: 'The resource does not exist!',
			});
		}

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'The resource was returned successfully!',
			data: video,
		});
	});

	getVideos = asyncHandler(async (req, res, next) => {
		const videos = await VideoModel.getVideos();

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'The resources were returned successfully!',
			data: videos,
		});
	});

	postVideo = asyncHandler(async (req, res, next) => {
		const video = await VideoModel.postVideo(req.body, req.file);
		Screenshot.generate(video, req.file); // generate after 5 sec

		res.status(StatusCodes.CREATED).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'The resource was created successfully!',
			data: video,
		});
	});

	updateVideo = asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.updateVideo(id, req.body);

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'The resource was updated successfully!',
			data: video,
		});
	});

	deleteVideo = asyncHandler(async (req, res, next) => {
		const { id } = req.params;
		const video = await VideoModel.deleteVideo(id);

		if (!video.length) {
			return res.status(StatusCodes.NOT_FOUND).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: 'The resource does not exist!',
			});
		}

		res.status(StatusCodes.OK).json({
			status: 'success',
			request_url: req.originalUrl,
			message: 'The resource was deleted successfully!',
			data: video,
		});
	});
}

module.exports = new VideoController();
