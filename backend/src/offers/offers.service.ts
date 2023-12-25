import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/entities/wish.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
    private readonly wishesService: WishesService,
  ) {}

  async create(user: User, createOfferDto: CreateOfferDto) {
    const wish = await this.wishesService.findOne(createOfferDto.itemId);

    if (!wish) throw new NotFoundException('Пожелание не найдено');

    if (user.id === wish.owner.id)
      throw new BadRequestException('Нельзя скинуться на свое пожелание');

    const missingAmount = wish.price - wish.raised;

    if (createOfferDto.amount > missingAmount) {
      throw new BadRequestException(
        `Сумма собранных средств не может превышать стоимость подарка. Максимальная сумма платежа: ${missingAmount} руб.`,
      );
    }

    // Обновление суммы предварительного сбора у пожелания
    wish.raised = wish.raised + createOfferDto.amount;
    await this.wishRepository.save(wish);

    const newOffer = this.offerRepository.create({
      ...createOfferDto,
      user,
      item: wish,
    });
    return this.offerRepository.save(newOffer);
  }

  findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
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
    });
  }

  findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      relations: {
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
      where: { id },
    });
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    const offer = this.findOne(id);
    if (!offer) {
      throw new NotFoundException('Заявка не найдена');
    }
    return this.offerRepository.update({ id }, updateOfferDto);
  }

  remove(id: number) {
    return this.offerRepository.delete({ id });
  }
}
