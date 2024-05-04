import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  Delete,
  Patch,
  NotFoundException,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user-dto';
import { AuthService } from './auth-service';
import { SignInUserDTO } from './dtos/sign-in-user-dto';
import { CurrentUser } from '../decorators/current-user';

import { User } from './user.entity';
import { AuthGuard } from '../guards/auth-guard';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private user_service: UserService,
    private auth_service: AuthService,
  ) {}

  @Post('create')
  async newUser(@Body() body: CreateUserDTO, @Session() session: any) {
    const { email, password } = body;
    const user = await this.auth_service.signUp(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('login')
  async signIn(@Body() body: SignInUserDTO, @Session() session: any) {
    const { email, password } = body;
    const user = await this.auth_service.signIn(email, password);
    session.userId = user.id;
    return user;
  }

  @Get('current')
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('logout')
  async logout(@Session() session: any) {
    session.userId = null;
  }

  @Post('new')
  createUser(@Body() body: CreateUserDTO) {
    const { email, password } = body;
    this.user_service.create(email, password);
    return 'created user';
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const newId = parseInt(id);
    const user = await this.user_service.findOne(newId);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Get()
  find(@Query('email') email: string) {
    return this.user_service.find(email);
  }

  @Delete('/:id')
  async removeUser(@Param('id') id: string) {
    const user = await this.user_service.remove(parseInt(id));
    return user;
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.user_service.update(parseInt(id), body);
  }
}
