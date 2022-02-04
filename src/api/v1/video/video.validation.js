const param  = require('express-validator').param;

const VGetVideo = [param('id').isInt().toInt()];

module.exports = {
	VGetVideo,
};
