class VideoController {
	getSingleVideo = async (req, res, next) => {
		res.send({
			request_url: req.baseUrl,
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
}

module.exports = new VideoController();
