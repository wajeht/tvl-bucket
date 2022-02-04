const StatusCodes = require('http-status-codes').StatusCodes;

const notFoundHandler = (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		request_url: req.originalUrl,
		message: `You don't have permission to access ${req.originalUrl} on this server.!`,
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
