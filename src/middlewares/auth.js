const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
	try {
		const token = req.get('X-API-KEY');
		let decodedToken;

		if (!token || token == undefined) {
			throw new Error('No api key!');
		}

		decodedToken = jwt.verify(token, 'secret');

		if (!decodedToken) {
			throw new Error('Invalid wrong!');
		}

		next();
	} catch (err) {
		next(err);
	}
};

module.exports = { isAuth };
