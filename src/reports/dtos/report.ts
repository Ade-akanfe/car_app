import { Expose, Transform } from 'class-transformer';
import { UserEntity } from 'src/users/user.entities';

export class ReportDTO {
  @Expose()
  lon: number;

  @Expose()
  lat: number;

  @Expose()
  year: number;

  @Expose()
  model: string;

  @Expose()
  make: string;

  @Expose()
  milage: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: UserEntity;

  @Expose()
  id: number;

  @Expose()
  approved: boolean;
}
