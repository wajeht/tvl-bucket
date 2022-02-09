const StatusCodes = require('http-status-codes').StatusCodes;
const { env } = require('../app/config/env.js');

const notFoundHandler = (req, res, next) => {
	res.status(StatusCodes.NOT_FOUND).json({
		status: 'fail',
		request_url: req.originalUrl,
		message: 'The resource does not exist!',
	});
};

const errorHandler = (err, req, res, next) => {
	res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
		status: 'fail',
		request_url: req.originalUrl,
		message:
			env == 'development'
				? err.stack
				: 'The server encountered an internal error or misconfiguration and was unable to complete your request.',
	});
};

module.exports = {
	notFoundHandler,
	errorHandler,
};
