import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  // Хеширование пароля
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Верификация хеша
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
