import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsNotEmpty, IsUrl, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Мария',
  })
  @IsString()
  @Length(2, 30)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Информация о пользователе',
    example: 'Кое-что обо мне',
  })
  @IsString()
  @Length(2, 200)
  about: string;

  @ApiProperty({
    description: 'Ссылка на аватар',
    example: 'https://4tololo.ru/sites/default/files/images/20151209112135.jpg',
  })
  @IsString()
  @IsUrl()
  avatar: string;

  @ApiProperty({
    description: 'Почта пользователя',
    example: 'example@yandex.ru',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя', example: '123qwerty' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
