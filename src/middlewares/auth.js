const bcrypt = require('bcryptjs');
const db = require('../../database/db.js');

const isAuth = async (req, res, next) => {
	try {
		const api = req.get('X-API-KEY');

		if (!api || api == undefined) {
			throw new Error('No api key!');
		}

		const isKey = await db.select('*').from('api_key').where({ key: api });

		if (!isKey.length) {
			throw new Error('Invalid api key!');
		}

		const { hashed_key } = isKey[0];

		const sameKey = await bcrypt.compare(api, hashed_key);

		if (!sameKey) {
			throw new Error('Wrong api key!');
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { isAuth };
