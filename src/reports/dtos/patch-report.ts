import { IsBoolean, IsNotEmpty } from 'class-validator';

export class PatchDTO {
  @IsNotEmpty()
  @IsBoolean()
  approve: boolean;
}
