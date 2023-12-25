import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Length, IsUrl, IsInt, Min } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { ColumnNumericTransformer } from 'src/utils/column-numeric-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Wish extends BaseEntity {
  // Название подарка
  @ApiProperty({
    description: 'Название подарка',
    example: 'Фигурка Пеннивайз',
  })
  @Column()
  @Length(1, 250)
  name: string;

  // Ссылка на интернет-магазин, в котором можно приобрести подарок
  @ApiProperty({
    description:
      'Ссылка на интернет-магазин, в котором можно приобрести подарок',
    example:
      'https://market.yandex.ru/product--figurka-bendyfigs-ono-pennivaiz-19-sm/1660953307?sku=101588238712&do-waremd5=pLotU0e_na9K3KUGStXURg&uniqueId=891588',
  })
  @Column()
  @IsUrl()
  link: string;

  // Ссылка на изображение подарка
  @ApiProperty({
    description: 'Ссылка на изображение подарка',
    example:
      'https://avatars.mds.yandex.net/get-mpic/5222546/img_id901625207803909329.jpeg/600x800',
  })
  @Column()
  @IsUrl()
  image: string;

  // Стоимость подарка
  @ApiProperty({ description: 'Стоимость подарка', example: '2061' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  @Min(1)
  price: number;

  // Сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок
  @ApiProperty({
    description:
      'Сумма предварительного сбора или сумма, которую пользователи сейчас готовы скинуть на подарок',
    example: '200',
  })
  @Column({
    default: 0,
    type: 'decimal',
    precision: 10,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  raised: number;

  // Ссылка на пользователя, который добавил пожелание подарка.
  @ApiProperty({
    description: 'Ссылка на пользователя, который добавил пожелание подарка',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.wishes, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;

  // Описание подарка
  @ApiProperty({
    description: 'Описание подарка',
    example: 'Фигурка Bendyfigs Оно Пеннивайз, 19 см.',
  })
  @Column()
  @Length(1, 1024)
  description: string;

  // Массив ссылок на заявки скинуться от других пользователей.
  @ApiProperty({
    description: 'Массив ссылок на заявки скинуться от других пользователей',
    type: () => [Offer],
  })
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];

  // Счётчик тех, кто скопировал подарок себе
  @ApiProperty({
    description: 'Счётчик тех, кто скопировал подарок себе',
    example: '2',
  })
  @Column({ default: 0 })
  @IsInt()
  copied: number;
}
