import { Transform } from 'class-transformer';
import {
  IsLongitude,
  IsNotEmpty,
  Min,
  Max,
  IsLatitude,
  IsNumber,
} from 'class-validator';

export class ReportDTO {
  @IsNotEmpty()
  @IsLongitude()
  long: number;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @Min(1998)
  @Max(2030)
  year: number;

  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  milage: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
