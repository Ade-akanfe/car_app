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
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user-dto';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dtos/update-user-dto';
import { Serialize } from 'src/interceptors/serialize-interceptor';
import { UserDto } from './dtos/user-dto';
import { AuthService } from './auth-service';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private user_service: UserService,
    private auth_service: AuthService,
  ) {}

  @Post('create')
  async newUser(@Body() body: CreateUserDTO) {
    const { email, password } = body;
    const user = await this.auth_service.signUp(email, password);
    return user;
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
