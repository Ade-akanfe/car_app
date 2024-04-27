import {
  CallHandler,
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export const Serialize = (dto: ClassConstructor) => {
  return UseInterceptors(new SerializeInterceptor(dto));
};

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // run stuffs before request is handles before handle
    // console.log('running before handler', context);

    return handler.handle().pipe(
      map((data: any) => {
        // run anything before response is being sent
        // console.log("i'm running stuffs before response is being sent ", data);
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true, // makes sure everthing works as possible,expose properties that has decorator of expose
        });
      }),
    );
  }
}
