import {
  Body,
  Controller,
  Get,
  MethodNotAllowedException,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UserDTO } from './dtos/user.dto';
import { Serialize } from 'src/interceptor/serialize.interceptor';
import { AuthService } from './auth.service';
import { currentUser } from 'src/decorator/current-user';
import { CurrentUserInterceptor } from './interceptors/current-user';
import { AuthGuard } from 'src/guards/auth-guard';

@Controller('auth')
@Serialize(UserDTO)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private user_service: UsersService,
    private auth_service: AuthService,
  ) {}
  @Post('/new')
  async createUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.auth_service.signUp({
      email: body.email,
      password: body.password,
    });
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async loginUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const user = await this.auth_service.signIn({
      email: body.email,
      password: body.password,
    });
    session.userId = user.id;
    return user;
  }

  @Get('/me')
  @UseGuards(AuthGuard)
  async activeUser(@currentUser() current_user: any) {
   
    return current_user;
  }

  @Get('/logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }
}
