const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const generateAPIKey = () => {
	const api = crypto.randomUUID();
	return api;
};

const api = generateAPIKey();

const token = jwt.sign({ api }, 'secret', { expiresIn: '1h' });

console.log(token);
