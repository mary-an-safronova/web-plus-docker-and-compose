import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Wishlist extends BaseEntity {
  // Название списка подарков
  @ApiProperty({
    description: 'Название списка подарков',
    example: 'Мой вишлист',
  })
  @Column()
  @Length(1, 250)
  name: string;

  // Описание подборки
  @ApiProperty({
    description: 'Описание подборки',
    example: 'Мой вишлист с пожеланиями',
  })
  @Column({ default: null })
  @Length(0, 1500)
  description: string;

  // Обложка для подборки
  @ApiProperty({
    description: 'Обложка для подборки',
    example:
      'https://www.uralsouvenir.ru/wa-data/public/photos/71/00/71/71.970.jpg',
  })
  @Column()
  @IsUrl()
  image: string;

  // Ссылка на пользователя, который создал вишлист.
  @ApiProperty({
    description: 'Ссылка на пользователя, который создал вишлист',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.wishlists, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  owner: User;

  // Набор ссылок на подарки.
  @ApiProperty({
    description: 'Массив id пожеланий, содержащихся в вишлисте',
    type: () => [Wish],
  })
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
}
