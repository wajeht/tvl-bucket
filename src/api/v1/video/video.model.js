const db = require("../../../../database/db.js");

class VideoModel {
  #db;

  constructor() {
    this.#db = db;
  }

  getVideo(id) {
    return this.#db.select("*").from("video").where({ id });
  }

  getVideos() {
    return this.#db.select("*").from("video");
  }

  postVideo(body, video) {
    return this.#db
      .insert({
        username: body.username,
        user_id: body.user_id,
        video_path: video.path.slice(video.path.indexOf("/upload")),
      })
      .into("video")
      .returning("*")
      .then(async (res) => {
        const { id } = res[0];
        await db
          .insert({
            filename: video.filename,
            size: video.size,
            mimetype: video.mimetype,
            video_id: id,
            absolute_video_path: video.path,
          })
          .into("video_details");
        return res;
      });
  }

  updateVideo(id, video) {
    return this.#db
      .update({
        screenshot_path: video.screenshot_path,
        video_path: video.video_path,
      })
      .from("video")
      .where({ id })
      .returning("*");
  }

  deleteVideo(id) {
    return this.#db.del().from("video").where({ id }).returning("*");
  }
}

module.exports = new VideoModel();
