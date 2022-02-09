import { check, param, body } from 'express-validator';

class VideoValidation {
  /**
   * getVideo Controller Validation
   */
  getVideo = [param('id').trim().isInt().withMessage('The value must be an integer!')];

  /**
   * postVideo Controller Validation
   */
  postVideo = [
    body('username').trim().notEmpty().withMessage('The value must not be empty!'),
    body('user_id').trim().notEmpty().withMessage('The value must not be empty!').isInt().withMessage('The value must be an integer!'),
    check('video')
      .custom((value, { req }) => {
        if (req.file) {
          return true;
        }
        return false;
      })
      .withMessage('File must be provided!'),
  ];

  /**
   * deleteVideo Controller Validation
   */
  deleteVideo = [param('id').trim().notEmpty().withMessage('The value must not be empty!').isInt().withMessage('The value must be an integer!')];

  /**
   * TODO:// test this schema
   * updateVideo Controller Validation
   */
  updateVideo = [
    body('username', 'The format is not correct!').not().isEmpty().trim().escape(),
    body('user_id', 'The format is not correct!').not().isEmpty().trim().escape(),
    body('video', 'The format is not correct!').isInt().toInt(),
  ];
}

export default new VideoValidation();
