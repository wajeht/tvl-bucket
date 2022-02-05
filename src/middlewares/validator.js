const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');

const validate = (schemas) => {
	return async (req, res, next) => {
		try {
			await Promise.all(schemas.map((schema) => schema.run(req)));

			const result = validationResult(req);

			if (result.isEmpty()) {
				return next();
			}

			const { errors } = result;

			return res.status(StatusCodes.BAD_REQUEST).json({
				status: 'failed',
				request_url: req.originalUrl,
				message: 'Validation errors in your request!',
				data: errors,
			});
		} catch (err) {
			next(err);
		}
	};
};

module.exports = { validate };
