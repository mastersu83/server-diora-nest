import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './entities/image.entity';
import { FilesService } from '../files/files.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
    private fileService: FilesService,
  ) {}

  async createFileName(file: any) {
    // console.log(image);
    const fileName = await this.fileService.createFile(file);
    return fileName;
  }
  async create(createImageDto: CreateImageDto) {
    return this.imageModel.create(createImageDto);
  }

  findAll() {
    return this.imageModel.find();
  }

  findOne(_id: string) {
    return this.imageModel.findOne({ _id });
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  async remove(_id: string) {
    try {
      const image = await this.imageModel.findOneAndDelete({ _id });
      console.log(image);
      if (!image) {
        throw new NotFoundException({ message: 'Фото не найдено' });
      }
    } catch (err) {
      throw new NotFoundException({ message: 'Фото не найдено' });
    }

    return { success: true };
  }
}
