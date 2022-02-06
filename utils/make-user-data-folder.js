const path = require('path');
const fs = require('fs');
const { root } = require('./directory.js');

const makeUserDataFolder = (username) => {
	try {
		const currentWeek = new Date().toLocaleDateString().split('/').join('-');
		const folder = path.join(
			root,
			'src',
			'public',
			'upload',
			username,
			currentWeek,
		);
		if (!fs.existsSync(path)) {
			fs.mkdir(folder, { recursive: true }, (err) => {
				if (err) throw err;
			});
		}
		return folder;
	} catch (err) {
		console.log(err);
	}
};

module.exports = makeUserDataFolder;
