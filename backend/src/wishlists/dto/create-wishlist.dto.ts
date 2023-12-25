import { ApiProperty } from '@nestjs/swagger';
import { Length, IsString, IsArray, IsUrl } from 'class-validator';

export class CreateWishlistDto {
  @ApiProperty({
    description: 'Название списка подарков',
    example: 'Мой вишлист',
  })
  @IsString()
  @Length(1, 250)
  name: string;

  @ApiProperty({
    description: 'Описание подборки',
    example: 'Мой вишлист с пожеланиями',
  })
  @Length(0, 1500)
  description: string;

  @ApiProperty({
    description: 'Обложка для подборки',
    example:
      'https://www.uralsouvenir.ru/wa-data/public/photos/71/00/71/71.970.jpg',
  })
  @IsUrl()
  image: string;

  @ApiProperty({
    description: 'Массив id пожеланий, содержащихся в вишлисте',
    example: '[5, 6, 10]',
  })
  @IsArray()
  itemsId: number[];
}
