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
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Wish } from './entities/wish.entity';
import { ApiDocs } from 'src/utils/api-doc.decorator';

@ApiDocs.Tags('Wishes') // Название группы запросов в документации
@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  // Создание пожелания
  @ApiDocs.CreatedResponse(Wish) // Ответ в документации
  @UseGuards(JwtGuard)
  @Post()
  create(@Req() req, @Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(req.user, createWishDto);
  }

  // Получение всех пожеланий
  @ApiDocs.OkResponse([Wish]) // Ответ в документации
  @UseGuards(JwtGuard)
  @Get()
  findAll() {
    return this.wishesService.findAll();
  }

  // Получение 40 последних пожеланий
  @ApiDocs.OkResponse([Wish]) // Ответ в документации
  @Get('last')
  findLast() {
    return this.wishesService.findLast();
  }

  // Получение последних 20 самых популярных пожеланий
  @ApiDocs.OkResponse([Wish]) // Ответ в документации
  @Get('top')
  findTop() {
    return this.wishesService.findTop();
  }

  // Получение пожелания по его id
  @ApiDocs.OkResponse(Wish) // Ответ в документации
  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.wishesService.findOne(id);
  }

  // Изменение пожелания
  @ApiDocs.OkResponse(Wish) // Ответ в документации
  @ApiDocs.BadRequestResponse({
    description:
      'Нельзя изменить пожелание, на которое уже кто-то готов скинуться',
  })
  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateWish(
    @Param('id') id: number,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    return await this.wishesService.update(req.user.id, id, updateWishDto);
  }

  // Удаление своего пожелания
  @ApiDocs.OkResponse(undefined, 'Пожелание успешно удалено') // Ответ в документации
  @ApiDocs.BadRequestResponse({
    description: 'Можно удалять только свои пожелания',
  })
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() req) {
    return await this.wishesService.remove(req.user.id, id);
  }

  // Копирование чужого пожелания к себе
  @ApiDocs.OkResponse(Wish) // Ответ в документации
  @UseGuards(JwtGuard)
  @Post(':id/copy')
  async copy(@Req() req, @Param('id') id: number) {
    return await this.wishesService.copy(req.user, id);
  }
}
