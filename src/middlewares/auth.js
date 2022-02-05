const bcrypt = require('bcryptjs');
const db = require('../../database/db.js');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
	try {
		const api = req.get('X-API-KEY');

		if (!api || api == undefined) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: 'Authentication credentials were missing!',
			});
		}

		const isKey = await db.select('*').from('api_key').where({ key: api });

		if (!isKey.length) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: 'Authentication credentials were invalid!',
			});
		}

		const { hashed_key } = isKey[0];

		const sameKey = await bcrypt.compare(api, hashed_key);

		if (!sameKey) {
			return res.status(StatusCodes.UNAUTHORIZED).json({
				status: 'fail',
				request_url: req.originalUrl,
				message: 'Authentication credentials were incorrect!',
			});
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { auth };
