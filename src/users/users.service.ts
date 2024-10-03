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
    const userExist = await this.repo.exists({
      where: {
        email: user.email,
      },
    });
    if (userExist) {
      throw new ConflictException(
        'User with email already exist, try another one.',
      );
    }
    const result = this.repo.create(user);
    await this.repo.save(result);
    return result;
  }

  async loginUser(user: CreateUserDTO) {
    const userExists = await this.repo.exists({
      where: {
        email: user.email,
      },
    });
    if (!userExists) {
      throw new NotFoundException('account not found');
    }
    
  }
}
