const VideoModel = require("./video.model.js");
const { StatusCodes } = require("http-status-codes");
const Screenshot = require("../../../../utils/screenshot.js");

class VideoController {
  #VideoModel;
  #StatusCodes;
  #Screenshot;

  constructor() {
    this.#VideoModel = VideoModel;
    this.#StatusCodes = StatusCodes;
    this.#Screenshot = Screenshot;
  }

  getVideo = async (req, res) => {
    const { id } = req.params;
    const video = await this.#VideoModel.getVideo(id);

    if (!video.length) {
      return res.status(this.#StatusCodes.NOT_FOUND).json({
        status: "fail",
        request_url: req.originalUrl,
        message: "The resource does not exist!",
      });
    }

    res.status(this.#StatusCodes.OK).json({
      status: "success",
      request_url: req.originalUrl,
      message: "The resource was returned successfully!",
      data: video,
    });
  };

  getVideos = async (req, res) => {
    const videos = await this.#VideoModel.getVideos();

    res.status(this.#StatusCodes.OK).json({
      status: "success",
      request_url: req.originalUrl,
      message: "The resources were returned successfully!",
      data: videos,
    });
  };

  postVideo = async (req, res) => {
    const video = await this.#VideoModel.postVideo(req.body, req.file);
    this.#Screenshot.generate(video, req.file); // generate after 5 sec

    res.status(this.#StatusCodes.CREATED).json({
      status: "success",
      request_url: req.originalUrl,
      message: "The resource was created successfully!",
      data: video,
    });
  };

  updateVideo = async (req, res) => {
    const { id } = req.params;
    const video = await this.#VideoModel.updateVideo(id, req.body);

    res.status(this.#StatusCodes.OK).json({
      status: "success",
      request_url: req.originalUrl,
      message: "The resource was updated successfully!",
      data: video,
    });
  };

  deleteVideo = async (req, res) => {
    const { id } = req.params;
    const video = await this.#VideoModel.deleteVideo(id);

    if (!video.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "fail",
        request_url: req.originalUrl,
        message: "The resource does not exist!",
      });
    }

    res.status(this.#StatusCodes.OK).json({
      status: "success",
      request_url: req.originalUrl,
      message: "The resource was deleted successfully!",
      data: video,
    });
  };
}

module.exports = new VideoController();
