#!/usr/bin/env node

const crypto = require('crypto');
const { program } = require('commander');

const generateAPIKey = () => {
	const api = crypto.randomUUID();
	return api;
};

const api = generateAPIKey();
console.log({ "X-API-KEY": api });
