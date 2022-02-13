import fs from 'fs';
import path from 'path';

class File {
  private filePath: string;
  private file: any;

  /**
   *
   * @param {String} file_path
   */
  constructor(filePath: string) {
    let file = fs.existsSync(filePath);
    if (!file) {
      throw new Error('File does not exist!');
    }
    this.filePath = filePath;
  }

  /**
   * Format bytes as human-readable text.
   *
   * @param bytes Number of bytes.
   * @param si True to use metric (SI) units, aka powers of 1000. False to use
   *           binary (IEC), aka powers of 1024.
   * @param dp Number of decimal places to display.
   *
   * @return Formatted string.
   */
  private getHumanReadableFileSize = (bytes: any, si = false, dp = 1) => {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
  };

  /**
   *
   * @returns file size in human readable format
   */
  private getFileSize = async () => {
    let fileSize: any = await fs.promises.stat(this.filePath);
    fileSize = this.getHumanReadableFileSize(fileSize.size);
    return fileSize;
  };

  /**
   *
   * @returns file object that contains all file info
   */
  public getFileStats = async () => {
    this.file = {
      name: path.basename(this.filePath).split('.')[0],
      size: await this.getFileSize(),
      type: path.basename(this.filePath).split('.')[1],
    };
    return this.file;
  };
}

export default File;
