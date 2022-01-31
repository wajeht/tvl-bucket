#!/usr/bin/env node

const crypto = require('crypto');

const generateAPIKey = () => {
	const api = crypto.randomUUID();
	return api;
};

const api = generateAPIKey();
