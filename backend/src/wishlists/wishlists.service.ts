import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}

  async create(owner: User, createWishlistDto: CreateWishlistDto) {
    const items = await this.wishRepository.find({
      where: { id: In(createWishlistDto.itemsId) },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { itemsId, ...rest } = createWishlistDto;
    return await this.wishlistRepository.save({
      ...rest,
      owner,
      items,
    });
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }

  findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOne({
      relations: {
        owner: true,
        items: true,
      },
      where: { id },
    });
  }

  async update(user: User, id: number, updateWishlistDto: UpdateWishlistDto) {
    const wishlist = await this.findOne(id);

    if (!wishlist) {
      throw new NotFoundException('Список подарков не найден');
    }

    if (wishlist.owner.id !== user.id) {
      throw new BadRequestException(
        'Можно изменять только свои списки пожеланий',
      );
    }

    const items = await this.wishRepository.find({
      where: { id: In(updateWishlistDto.itemsId) },
    });

    if (items.length !== updateWishlistDto.itemsId.length) {
      throw new NotFoundException(
        'Не удалось найти все пожелания для обновления',
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { itemsId, ...rest } = updateWishlistDto;

    await this.wishlistRepository.save({
      ...rest,
      id: wishlist.id,
      owner: wishlist.owner,
      items,
      updatedAt: new Date(),
      createdAt: wishlist.createdAt,
    });

    return await this.findOne(id);
  }

  async remove(userId, id: number) {
    const wishlist = await this.findOne(id);

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException(
        'Можно удалять только свои списки пожеланий',
      );
    }
    return await this.wishlistRepository.delete({ id });
  }
}
