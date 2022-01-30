const uuid = require('uuid').v4;
const multer = require('multer');

const path = require('path');

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
		const { username } = req.session;
		cb(null, `public/upload/${username}/`);
	},
	filename: (req, file, cb) => {
		cb(null, uuid());
	},
});

const upload = multer({
	fileFilter: fileFilter,
	storage: fileStorage,
	limits: {
		fileSize: 10 * 1024 * 1024, // 10mb
	},
});

const uploadVideo = upload.single('video');

module.exports = {
	uploadVideo,
};
