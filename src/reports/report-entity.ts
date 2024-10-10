import { UserEntity } from 'src/users/user.entities';
import {
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  long: number;

  @Column()
  price: number;

  @Column()
  lat: number;

  @Column()
  year: number;

  @Column()
  model: string;

  @Column()
  make: string;

  @Column()
  milage: number;

  @ManyToOne(() => UserEntity, (user) => user.reports)
  user: UserEntity;

  @Column({ default: false })
  approved: boolean;

  @AfterInsert()
  logInsert() {
    console.log('Inserted with Id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated with Id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed item with Id', this.id);
  }
}
