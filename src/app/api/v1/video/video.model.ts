import db from '../../../../database/db';

class VideoModel {
  private db: any;

  constructor() {
    this.db = db;
  }

  public getVideo(id: number): Promise<void> {
    return this.db.select('*').from('video').where({ id });
  }

  public getVideos() {
    return this.db.select('*').from('video');
  }

  public postVideo(body: any, video: any): Promise<void> {
    return this.db
      .insert({
        username: body.username,
        user_id: body.user_id,
        video_path: video.path.slice(video.path.indexOf('/upload')),
      })
      .into('video')
      .returning('*')
      .then(async (res: Array<any>) => {
        const { id } = res[0];
        await db
          .insert({
            filename: video.filename,
            size: video.size,
            mimetype: video.mimetype,
            video_id: id,
            absolute_video_path: video.path,
          })
          .into('video_details');
        return res;
      });
  }

  public updateVideo(id: number, video: any) {
    return this.db
      .update({
        screenshot_path: video.screenshot_path,
        video_path: video.video_path,
      })
      .from('video')
      .where({ id })
      .returning('*');
  }

  public deleteVideo(id: number): Promise<void> {
    return this.db.del().from('video').where({ id }).returning('*');
  }
}

export default new VideoModel();
