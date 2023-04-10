import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTruckDto {
  @IsString()
  name: string;
}
