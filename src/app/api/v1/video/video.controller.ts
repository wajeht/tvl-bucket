import VideoModel from './video.model';
import { StatusCodes } from 'http-status-codes';
import Screenshot from '../../../../utils/screenshot';
import { Request, Response } from 'express';

class VideoController {
  private VideoModel: any;
  private StatusCodes: any;
  private Screenshot: any;

  constructor() {
    this.VideoModel = VideoModel;
    this.StatusCodes = StatusCodes;
    this.Screenshot = Screenshot;
  }

  public getVideo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const video = await this.VideoModel.getVideo(id);

    if (!video.length) {
      res.status(this.StatusCodes.NOT_FOUND).json({
        status: 'fail',
        request_url: req.originalUrl,
        message: 'The resource does not exist!',
      });
    }

    res.status(this.StatusCodes.OK).json({
      status: 'success',
      request_url: req.originalUrl,
      message: 'The resource was returned successfully!',
      data: video,
    });
  };

  public getVideos = async (req: Request, res: Response): Promise<void> => {
    const videos = await this.VideoModel.getVideos();

    res.status(this.StatusCodes.OK).json({
      status: 'success',
      request_url: req.originalUrl,
      message: 'The resources were returned successfully!',
      data: videos,
    });
  };

  public postVideo = async (req: Request, res: Response): Promise<void> => {
    const video = await this.VideoModel.postVideo(req.body, req.file);
    this.Screenshot.generate(video, req.file); // generate after 5 sec

    res.status(this.StatusCodes.CREATED).json({
      status: 'success',
      request_url: req.originalUrl,
      message: 'The resource was created successfully!',
      data: video,
    });
  };

  public updateVideo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const video = await this.VideoModel.updateVideo(id, req.body);

    res.status(this.StatusCodes.OK).json({
      status: 'success',
      request_url: req.originalUrl,
      message: 'The resource was updated successfully!',
      data: video,
    });
  };

  public deleteVideo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const video = await this.VideoModel.deleteVideo(id);

    if (!video.length) {
      res.status(this.StatusCodes.NOT_FOUND).json({
        status: 'fail',
        request_url: req.originalUrl,
        message: 'The resource does not exist!',
      });
    }

    res.status(this.StatusCodes.OK).json({
      status: 'success',
      request_url: req.originalUrl,
      message: 'The resource was deleted successfully!',
      data: video,
    });
  };
}

export default new VideoController();
