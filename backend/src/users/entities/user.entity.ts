import { Entity, Column, OneToMany } from 'typeorm';
import { Length, IsEmail, IsNotEmpty, IsUrl } from 'class-validator';
import { BaseEntity } from 'src/entities/base.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends BaseEntity {
  // Имя пользователя
  @ApiProperty({ description: 'Имя пользователя', example: 'Василий' })
  @Column({ unique: true })
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  // Информация о пользователе
  @ApiProperty({
    description: 'Информация о пользователе',
    example: 'Кое-что о Василии',
  })
  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;

  // Ссылка на аватар
  @ApiProperty({
    description: 'Ссылка на аватар',
    example:
      'https://celes.club/uploads/posts/2021-12/1638606988_35-celes-club-p-chernii-kot-s-belimi-usami-zhivotnie-krasi-37.jpg',
  })
  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  // Почта пользователя
  @ApiProperty({
    description: 'Почта пользователя',
    example: 'example@yandex.ru',
  })
  @Column({ unique: true })
  @IsEmail()
  email: string;

  // Пароль пользователя
  @Column({ select: false })
  password: string;

  // Список желаемых подарков пользователя.
  @OneToMany(() => Wish, (wish) => wish.owner)
  wishes: Wish[];

  // Список подарков, на которые скидывается пользователь.
  @OneToMany(() => Offer, (offer) => offer.user)
  offers: Offer[];

  // Список вишлистов, которые создал пользователь.
  @OneToMany(() => Wishlist, (wishlist) => wishlist.owner)
  wishlists: Wishlist[];
}
