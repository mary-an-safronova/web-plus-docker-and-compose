import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  IsUrl,
  IsString,
  IsNumber,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateWishDto {
  @ApiProperty({
    description: 'Название подарка',
    example: 'Фигурка Пеннивайз',
  })
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  name: string;

  @ApiProperty({
    description:
      'Ссылка на интернет-магазин, в котором можно приобрести подарок',
    example:
      'https://market.yandex.ru/product--figurka-bendyfigs-ono-pennivaiz-19-sm/1660953307?sku=101588238712&do-waremd5=pLotU0e_na9K3KUGStXURg&uniqueId=891588',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  link: string;

  @ApiProperty({
    description: 'Ссылка на изображение подарка',
    example:
      'https://avatars.mds.yandex.net/get-mpic/5222546/img_id901625207803909329.jpeg/600x800',
  })
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  image: string;

  @ApiProperty({ description: 'Стоимость подарка', example: '2061' })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price: number;

  @ApiProperty({
    description: 'Описание подарка',
    example: 'Фигурка Bendyfigs Оно Пеннивайз, 19 см.',
  })
  @IsNotEmpty()
  @Length(1, 1024)
  description: string;
}
