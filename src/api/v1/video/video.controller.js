class VideoController {
	getVideo = async (req, res, next) => {
		res.status(200).json({
			request_url: req.originalUrl,
			message: 'A single video has returned',
			data: [
				{
					name: 'squat training',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
					screenshot_url: '/jaw/storage/upload/jaw/screenshot.jpg',
					video_url: '/jaw/storage/upload/jaw/video.mp4',
					date_stamp: '12/12/2020 5:00AM',
				},
			],
		});
	};

	getVideos = async (req, res, next) => {
		res.status(200).json({
			request_url: req.originalUrl,
			message: 'Many videos have returned',
			data: [
				{
					name: 'squat training',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
					screenshot_url: '/jaw/storage/upload/jaw/screenshot.jpg',
					video_url: '/jaw/storage/upload/jaw/video.mp4',
					date_stamp: '12/12/2020 5:00AM',
				},
				{
					name: 'bench training',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
					screenshot_url: '/jaw/storage/upload/jaw/screenshot.jpg',
					video_url: '/jaw/storage/upload/jaw/video.mp4',
					date_stamp: '11/11/2000 3:00AM',
				},
			],
		});
	};

	postVideo = async (req, res, next) => {};
	updateVideo = async (req, res, next) => {};
	deleteVideo = async (req, res, next) => {};
}

module.exports = new VideoController();
