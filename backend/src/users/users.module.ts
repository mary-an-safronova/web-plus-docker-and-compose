import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/shared/bcrypt.service';
import { WishesModule } from 'src/wishes/wishes.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WishesModule],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
