import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async createFile(imageUrl) {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(
        path.join(filePath, imageUrl.originalname),
        imageUrl.buffer,
      );
      return { imageUrl: imageUrl.originalname };
    } catch (err) {
      throw new HttpException('scsdc', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
