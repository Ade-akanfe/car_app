import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private user_service: UserService) {}
  async signUp(email: string, password: string) {
    const [user, ..._] = await this.user_service.find(email);
    if (user) {
      throw new BadRequestException('email is in use');
    }
    // hash password
    // generate salt
    const salt = randomBytes(8).toString('hex');

    //  hash the salt and passwoord together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // join the hash with the salt
    const result = `${hash.toString('hex')}.${salt}`;
    let new_user = this.user_service.create(email, result);
    return new_user;
  }
  async signIn(email: string, password: string) {
    const [user, ..._] = await this.user_service.find(email);
    if (!user) {
      throw new BadRequestException('invalid email or password');
    }

    const salt = user.password.split('.')[1];
    const hashed = (await scrypt(password, salt, 32)) as Buffer;
    const result = `${hashed.toString('hex')}.${salt}`;
    if (!(result.toString() === user.password.toString())) {
      throw new BadRequestException('invalid email or password');
    }
    return user;
  }
}
