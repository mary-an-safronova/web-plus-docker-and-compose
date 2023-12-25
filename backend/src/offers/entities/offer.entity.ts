import { Entity, Column, ManyToOne } from 'typeorm';
import { IsNumber } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Offer extends BaseEntity {
  // Сумма заявки
  @ApiProperty({ description: 'Сумма заявки', example: '100' })
  @Column({
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @IsNumber()
  amount: number;

  // Флаг, который определяет показывать ли информацию о скидывающемся в списке
  @ApiProperty({
    description:
      'Флаг, который определяет показывать ли информацию о скидывающемся в списке',
    example: 'true',
  })
  @Column({ default: false })
  hidden: boolean;

  // Id желающего скинуться;
  @ApiProperty({
    description: 'Id желающего скинуться',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.offers)
  user: User;

  // Пожелание, на которое скидываются
  @ApiProperty({
    description: 'Id пожелания, на которое скидываются',
    type: () => Wish,
  })
  @ManyToOne(() => Wish, (wish) => wish.offers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  item: Wish;
}
