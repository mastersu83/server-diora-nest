import { Document, HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = HydratedDocument<Image>;

export interface IImage extends Document {
  readonly type: string;
  readonly typeOfClothing: string;
  readonly imageUrl: string;
}

@Schema({
  timestamps: true,
})
export class Image {
  @Prop()
  type: string;

  @Prop()
  typeOfClothing: string;

  @Prop()
  imageUrl: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
