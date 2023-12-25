import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../shared/bcrypt.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private bcryptService: BcryptService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private usersService: UsersService,
  ) {}

  auth(user: User) {
    // Генерируем токен
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string): Promise<User> {
    // Получаем пользователя по имени вместе с полем пароля
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const comparePassword = await this.bcryptService.comparePasswords(
      password,
      user.password,
    );

    if (!comparePassword)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async signup(createUserDto: CreateUserDto) {
    const hashedPassword = await this.bcryptService.hashPassword(
      createUserDto.password,
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = createUserDto;
    // При регистрации создаём пользователя
    const user = await this.usersService.create({
      password: hashedPassword,
      ...rest,
    });
    // и генерируем для него токен
    return this.auth(user);
  }
}
