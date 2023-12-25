import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/shared/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private bcryptService: BcryptService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByName(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findMany({ query }: SearchUserDto) {
    return this.userRepository.find({
      where: [{ email: query }, { username: query }],
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Хеширование пароля при его обновлении
    if (updateUserDto.password) {
      const hashedPassword = await this.bcryptService.hashPassword(
        updateUserDto.password,
      );
      updateUserDto.password = hashedPassword;
    }
    // Обновляем данные пользователя
    await this.userRepository.update(
      { id },
      { updatedAt: new Date(), ...updateUserDto },
    );
    return await this.findOne(id);
  }

  async removeById(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return this.userRepository.delete({ id });
  }
}
