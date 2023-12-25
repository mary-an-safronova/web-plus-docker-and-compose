import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class BaseEntity {
  // Уникальный id
  @ApiProperty({ description: 'Уникальный id', example: '7' })
  @PrimaryGeneratedColumn()
  id: number;

  // Дата создания
  @ApiProperty({ description: 'Дата создания' })
  @CreateDateColumn()
  createdAt: Date;

  // Дата изменения
  @ApiProperty({ description: 'Дата изменения' })
  @UpdateDateColumn()
  updatedAt: Date;
}
