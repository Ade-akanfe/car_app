import { Transform } from 'class-transformer';
import {
  IsLongitude,
  IsNotEmpty,
  Min,
  Max,
  IsLatitude,
  IsNumber,
} from 'class-validator';

export class EstimateReportDTO {
  @IsNotEmpty()
  @IsLongitude()
  long: number;

  @IsNotEmpty()
  make: string;

  @IsNotEmpty()
  model: string;

  @Transform(({ value }) => parseInt(value))
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
}
