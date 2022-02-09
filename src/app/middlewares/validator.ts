const fs = require('fs').promises;
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

			if (req.file) {
				const { path } = req.file;
				const removed = await fs.unlink(path);
				// TODO: currently the file is still being uploaded
				// TODO: even after validation errors occurred
				// TODO: this little hack will delete the file
			}

			const { errors } = result;

			return res.status(StatusCodes.BAD_REQUEST).json({
				status: 'failed',
				request_url: req.originalUrl,
				message: 'Validation errors in your request!',
				errors,
			});
		} catch (err) {
			next(err);
		}
	};
};

module.exports = { validate };
