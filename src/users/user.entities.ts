import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  Unique,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
@Unique(['email'])
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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
