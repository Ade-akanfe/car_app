import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private user_service: UsersService) {}
  async signUp({ email, password }) {
    const exists = await this.user_service.CheckAccountStatus(email);

    if (exists) {
      throw new BadRequestException();
    }

    const salt = randomBytes(8).toString('hex');

    const halvedhash = (await scrypt(salt, password, 32)) as Buffer;

    const finalHashed = salt + '.' + halvedhash.toString('hex');

    const user = this.user_service.createNewUser({
      email,
      password: finalHashed,
    });
    return user;
  }
  async signIn({ email, password }) {
    const exists = await this.user_service.CheckAccountStatus(email);
    if (!exists) {
      throw new NotFoundException({ message: 'Account not found' });
    }
    const user = await this.user_service.findUserByEmail(email);
    const [salt, hash] = user.password.split('.');
    const newHashed = (await scrypt(salt, password, 32)) as Buffer;
    if (!(newHashed.toString('hex') === hash)) {
      throw new BadRequestException({ message: 'incorrect password' });
    }
    return user;
  }
}
