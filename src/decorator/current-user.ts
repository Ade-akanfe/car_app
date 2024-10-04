import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common';

const currentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
export { currentUser };
