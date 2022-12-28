import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNumber()
  type: number;

  @IsString()
  typeOfClothing: string;

  @IsString()
  imageUrl: string;
}
