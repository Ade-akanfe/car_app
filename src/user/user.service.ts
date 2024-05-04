import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

// you can create exception filter for othe rtype of communication aside from Http

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async create(email: string, password: string) {
    const user_entity = this.repo.create({ email, password });
    await this.repo.save(user_entity);
    return user_entity;
  }
  findOne(id: number) {
    if (!id) {
      throw new BadRequestException('invalid user');
    }
    return this.repo.findOneBy({ id });
  }

  find(email: string) {
    return this.repo.findBy({ email });
  }

  async update(id: number, attrs: Partial<User>) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    let user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    this.repo.remove(user);
  }
}
