const ffmpeg = require("fluent-ffmpeg");
const db = require("../database/db.js");

class Screenshot {
  #db;
  #ffmpeg;

  constructor() {
    this.#db = db;
    this.#ffmpeg = ffmpeg;
  }

  static #capture(path) {
    try {
      const folder = path
        .split("/")
        .splice(0, path.split("/").length - 1)
        .join("/");
      const filename = `/${path.split("/").pop().split(".")[0]}.jpg`;

      // take screenshot at the 0 second then save it at
      this.#ffmpeg(path).screenshots({
        timestamps: ["00:00:00.000"], // hh:mm:ss.xxx
        folder,
        filename,
      });

      return `${folder}${filename}`;
    } catch (err) {
      return err;
    }
  }

  static async #update(videoId, path) {
    try {
      const absolutePath = this.#capture(path);
      const relativePath = absolutePath.slice(absolutePath.indexOf("/upload"));

      // example select with db.raw)
      // db.raw(
      // 	`
      // 	SELECT *
      // 	FROM video AS v
      // 	INNER JOIN video_details AS vs
      // 		ON v.id = vs.video_id
      // 		WHERE v.id = ?
      // 		AND v.username = ?
      // `,
      // 	[videoId, 'phew'],
      // );

      // TODO: refactor this!
      await this.#db
        .update({ screenshot_path: relativePath })
        .from("video")
        .where({ id: videoId });

      await this.#db
        .update({ absolute_screenshot_path: absolutePath })
        .from("video_details")
        .where({ video_id: videoId });

      console.log("Screenshot has been generated!");
    } catch (err) {
      return err;
    }
  }

  static generate(postedVideo, requestFileObject) {
    try {
      const { id } = postedVideo[0];
      setTimeout(() => {
        this.#update(id, requestFileObject.path);
      }, 5000);
    } catch (err) {
      return err;
    }
  }
}

module.exports = Screenshot;
