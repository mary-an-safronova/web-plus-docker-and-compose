import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  create(owner: User, createWishDto: CreateWishDto) {
    return this.wishRepository.save({ owner, ...createWishDto });
  }

  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async findOne(id: number) {
    const wish = await this.wishRepository.findOne({
      relations: {
        owner: true,
        offers: true,
      },
      where: { id },
    });
    return wish;
  }

  async findUserWishes(id: number) {
    const wishes = await this.wishRepository.find({
      relations: {
        offers: {
          item: {
            owner: true,
            offers: true,
          },
          user: {
            wishes: {
              owner: true,
              offers: true,
            },
            offers: {
              user: true,
            },
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
      where: { owner: { id } },
    });

    return wishes;
  }

  findLast(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  findTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { copied: 'DESC' },
      take: 20,
      relations: {
        owner: true,
        offers: true,
      },
    });
  }

  async update(userId: number, id: number, updateWishDto: UpdateWishDto) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== userId) {
      throw new BadRequestException('Можно изменять только свои пожелания');
    }
    if (wish.raised > 0) {
      throw new BadRequestException(
        'Нельзя изменить пожелание, на которое уже кто-то готов скинуться',
      );
    }
    await this.wishRepository.update(
      { id },
      { updatedAt: new Date(), ...updateWishDto },
    );
    return await this.findOne(id);
  }

  async remove(userId: number, id: number) {
    const wish = await this.findOne(id);
    if (wish.owner.id !== userId) {
      throw new BadRequestException('Можно удалять только свои пожелания');
    }
    return this.wishRepository.delete({ id });
  }

  async copy(user: User, id: number) {
    const wish = await this.findOne(id);
    await this.wishRepository.update({ id }, { copied: wish.copied + 1 });
    const { name, link, image, price, description } = wish;
    return await this.create(user, {
      name,
      link,
      image,
      price,
      description,
    });
  }
}
