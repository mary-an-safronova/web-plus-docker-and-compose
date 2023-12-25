import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SearchUserDto {
  @ApiProperty({ description: 'Параметр поиска', example: 'example@yandex.ru' })
  @IsString()
  query: string;
}
