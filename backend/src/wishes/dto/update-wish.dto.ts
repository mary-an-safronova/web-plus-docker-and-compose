import { PartialType } from '@nestjs/swagger';
import { CreateWishDto } from './create-wish.dto';
import { IsNotEmpty, IsInt } from 'class-validator';

export class UpdateWishDto extends PartialType(CreateWishDto) {
  @IsNotEmpty()
  @IsInt()
  copied?: number;

  raised?: number;
}
