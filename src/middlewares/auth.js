const bcrypt = require('bcryptjs');
const db = require('../../database/db.js');

const isAuth = (req, res, next) => {
	try {
		const api = req.get('X-API-KEY');

		if (!api || api == undefined) {
			throw new Error('No api key!');
		}

		db.select('*')
			.from('api_key')
			.where({ key: api })
			.then((res) => {
				if (res.length) {
					const { hashed_key } = res[0];
					return bcrypt.compare(api, hashed_key).then((same) => {
						if (!same) {
							throw new Error('Wrong api key!');
						}
						next();
					});
				}
				throw new Error('Invalid api key!');
			});
	} catch (err) {
		next(err);
	}
};

module.exports = { isAuth };
