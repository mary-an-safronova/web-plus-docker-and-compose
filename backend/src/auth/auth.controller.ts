import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { ApiDocs, LoginResponse } from 'src/utils/api-doc.decorator';

@ApiDocs.Tags('Auth') // Название группы запросов в документации
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // Авторизация пользователя
  @ApiDocs.OkResponse(LoginResponse) // Ответ в документации
  @ApiDocs.UnauthorizedResponse({
    description: 'Некорректная пара логин и пароль',
  })
  // Стратегия local автоматически достанет username и password из тела запроса
  // Если пароль будет верным, данные пользователя окажутся в объекте req.user
  @UseGuards(LocalGuard)
  @Post('signin')
  @ApiDocs.Body({
    type: 'object',
    properties: {
      username: { type: 'string', example: 'exampleuser' },
      password: { type: 'string', example: 'somestrongpassword' },
    },
  }) // Отображение запроса в документации
  async signin(@Req() req) {
    // Генерируем для пользователя JWT-токен
    return this.authService.auth(req.user);
  }

  // Регистрация пользователя
  @ApiDocs.CreatedResponse(User) // Ответ в документации
  @ApiDocs.ConflictResponse({
    description: 'Пользователь с таким email или username уже зарегистрирован',
  })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }
}
