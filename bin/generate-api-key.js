#!/usr/bin/env node

const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const { program } = require('commander');

const db = require('../database/db.js');

const APIKey = crypto.randomUUID();

bcrypt.hash(APIKey, 10).then((hashedAPIKey) => {
	db.insert({ key: APIKey, hashed_key: hashedAPIKey })
		.into('api_key')
		.returning('*')
		.then((res) => {
			if (res.length) {
				console.log({ 'X-API-KEY': APIKey });
				process.exit(1);
			}
		});
});
