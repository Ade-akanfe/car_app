import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private user_service: UsersService) {}
  @Post('/new')
  async createUser(@Body() body: CreateUserDTO) {
    try {
      return await this.user_service.createNewUser(body);
    } catch (error: any) {
      return { message: error.response.message, statusCode: error.status };
    }
  }
}
