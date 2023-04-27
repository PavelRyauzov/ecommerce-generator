import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

declare const Buffer;

@Injectable()
export class FileService {
  async createFileFromBase64(base64: string, destDir: string): Promise<string> {
    console.log(destDir);

    base64 = base64.replace(/\\r|\\n/g, '');
    const [metadata, data] = base64.split(',');
    const mimeType = metadata.split('/')[1].split(';')[0];
    const binaryData = Buffer.from(data, 'base64');

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    const fileName = uuid.v4();
    const filePath = path.join(destDir, fileName + '.' + mimeType);

    console.log(filePath);

    fs.writeFile(filePath, binaryData, { flag: 'w' }, (error) => {
      if (error) {
        console.error(`Error writing file: ${error}`);
        throw error;
      }
    });

    return filePath;
  }
}
