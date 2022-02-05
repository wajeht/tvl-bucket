const { param, body } = require('express-validator');

class VideoValidation {
	getVideo = [param('id', 'The format is not correct!').isInt().toInt()];
	postVideo = [
		body('username')
			.trim()
			.isEmpty()
			.withMessage('The value must not be empty!'),
		body('user_id').isEmpty().withMessage('The value must not be empty!'),
		// .isInt()
		// .withMessage('The value must be an integer!'),
		body('video').isEmpty().withMessage('The value must not be empty!'),
	];
	deleteVideo = [
		param('id', 'Oops! The format is not correct').isInt().toInt(),
	];
	updateVideo = [
		body('username', 'Oops! The format is not correct')
			.not()
			.isEmpty()
			.trim()
			.escape(),
		body('user_id', 'Oops! The format is not correct')
			.not()
			.isEmpty()
			.trim()
			.escape(),
		body('video', 'Oops! The format is not correct').isInt().toInt(),
	];
}

module.exports = new VideoValidation();
