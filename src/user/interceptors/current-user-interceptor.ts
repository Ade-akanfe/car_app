import {
  CallHandler,
  NestInterceptor,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { UserService } from '../user.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userservice: UserService) {}
  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;
    if (userId) {
      const user = await this.userservice.findOne(parseInt(userId));
      request.CurrentUser = user;
    }
    return handler.handle();
  }
}
