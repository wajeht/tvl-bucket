const uuid = require('uuid').v4;
const multer = require('multer');

const fs = require('fs');
const path = require('path');

const { root } = require('../../utils/directory.js');

const fileFilter = (req, file, cb) => {
	const fileTypes = /jpeg|jpg|png|gif|mp4|mov|mpeg/;
	const mimetype = fileTypes.test(file.mimetype);
	const extname = fileTypes.test(path.extname(file.originalname));

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb(null, false);
	}
};

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const { username } = req.body;
		const userFolder = path.join(root, `src/public/upload/${username}`);

		// if !folder, make one
		// TODO: fix a bug where it breaks on no upload folder
		if (!fs.existsSync(userFolder)) {
			fs.mkdir(userFolder, { recursive: true }, (err) => {
				if (!err) {
					throw new Error(
						`Something went wrong while making a folder for ${username}'s upload!`,
					);
				}
			});
		}

		cb(null, userFolder);
	},
	filename: (req, file, cb) => {
		cb(null, uuid() + '.' + file.originalname.split('.')[1]);
	},
});

const upload = multer({
	fileFilter: fileFilter,
	storage: fileStorage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10mb
	},
});

const uploadVideo = async (req, res, next) => {
	try {
		upload.single('video');
		next();
	} catch (err) {
		next(err);
	}
};

module.exports = {
	uploadVideo,
};
