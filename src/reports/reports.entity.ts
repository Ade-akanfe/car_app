import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ReportEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  price: number;
}
