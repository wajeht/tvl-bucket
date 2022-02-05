const StatusCodes = require('http-status-codes').StatusCodes;

const notFoundHandler = (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		status: 'fail',
		request_url: req.originalUrl,
		message: 'The resource does not exist!',
	});
};

const errorHandler = (err, req, res, next) => {
	res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ request_url: req.originalUrl, message: err.message });
};

module.exports = {
	notFoundHandler,
	errorHandler,
};
