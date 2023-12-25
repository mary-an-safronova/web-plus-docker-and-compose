import { PartialType } from '@nestjs/swagger';
import { CreateWishlistDto } from './create-wishlist.dto';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  owner: User;
  items: Wish[];
}
