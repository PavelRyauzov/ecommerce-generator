import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

declare const Buffer;

@Injectable()
export class FileService {
  async createFileFromBase64(
    base64: string,
    filePath: string,
    fileName: string,
  ) {
    base64 = base64.replace(/\\r\\n/g, '');
    const [metadata, data] = base64.split(',');
    const mimeType = metadata.split('/')[1].split(';')[0];

    const binaryData = Buffer.from(data, 'base64');

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true });
    }

    fs.writeFile(
      path.join(filePath, fileName + '.' + mimeType),
      binaryData,
      (error) => {
        if (error) {
          console.error(`Error writing file: ${error}`);
          throw error;
        }
      },
    );
  }
}
