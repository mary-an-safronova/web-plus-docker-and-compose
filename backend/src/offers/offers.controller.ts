import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Offer } from './entities/offer.entity';
import { ApiDocs } from 'src/utils/api-doc.decorator';

@ApiDocs.Tags('Offers') // Название группы запросов в документации
@UseGuards(JwtGuard) // Гард JwtGuard применен ко всем методам контроллера
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  // Создание оффера
  @ApiDocs.CreatedResponse(Offer) // Ответ в документации
  @ApiDocs.NotFoundResponse({ description: 'Пожелание не найдено' })
  @ApiDocs.BadRequestResponse({
    description: 'Сумма собранных средств не может превышать стоимость подарка',
  })
  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    return this.offersService.create(req.user, createOfferDto);
  }

  // Получение всех офферов
  @ApiDocs.OkResponse([Offer]) // Ответ в документации
  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  // Получение оффера по id
  @ApiDocs.OkResponse(Offer) // Ответ в документации
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.offersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offersService.update(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.offersService.remove(+id);
  }
}
