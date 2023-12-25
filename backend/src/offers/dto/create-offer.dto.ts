import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, Min } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ description: 'Сумма заявки', example: '100' })
  @IsNotEmpty()
  @Min(1)
  amount: number;

  @ApiProperty({
    description:
      'Флаг, который определяет показывать ли информацию о скидывающемся в списке',
    example: 'true',
  })
  @IsBoolean()
  hidden: boolean;

  @ApiProperty({
    description: 'Id пожелания, на которое скидываются',
    example: '12',
  })
  @IsNotEmpty()
  itemId: number;
}
