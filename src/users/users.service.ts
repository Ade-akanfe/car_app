import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}
  async createNewUser(user: CreateUserDTO) {
    const result = this.repo.create(user);
    await this.repo.save(result);
    return result;
  }

  async findUser(id: number) {
    const userExists = await this.repo.exists({
      where: {
        id,
      },
    });
    if (!userExists) {
      throw new NotFoundException('account not found');
    }
    const userVal = await this.repo.findOne({
      where: {
        id,
      },
    });
    return userVal;
  }

  async CheckAccountStatus(email: string) {
    const userExists = await this.repo.exists({
      where: {
        email,
      },
    });

    return userExists;
  }

  async findUserByEmail(email: string) {
    const user = await this.repo.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}
