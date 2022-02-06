const path = require('path');
const fs = require('fs');
const { root } = require('./directory.js');

const makeUserDataFolder = async (username) => {
	try {
		const currentWeek = new Date().toLocaleDateString().split('/').join('-');
		const upload = path.join(
			root,
			'src',
			'public',
			'upload',
			username,
			currentWeek,
		);
		if (!fs.existsSync(path)) {
			fs.mkdir(upload, { recursive: true }, (err) => {
				if (err) throw err;
			});
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = makeUserDataFolder;
