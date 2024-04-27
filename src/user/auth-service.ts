import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './user.service';


@Injectable()
export class AuthService {
  constructor(private user_service: UserService) {}
  async signUp(email: string, password: string) {
    console.log(email);
    const [user, ..._] = await this.user_service.find(email);
    if (user) {
      throw new BadRequestException('email is in use');
    }

    return user;
  }
}
