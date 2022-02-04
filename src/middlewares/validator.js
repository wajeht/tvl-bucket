const { validationResult } = require('express-validator');

const validate = (schemas) => {
	return async (req, res, next) => {
		try {
			await Promise.all(schemas.map((schema) => schema.run(req)));

			const result = validationResult(req);
			if (result.isEmpty()) {
				return next();
			}

			return res.send(result);
		} catch (err) {

    }
	};
};

module.exports = { validate };
