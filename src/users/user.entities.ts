import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  Unique,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

import { Report } from 'src/reports/report-entity';

@Entity()
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @Column({ default: false })
  admin: boolean;

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
