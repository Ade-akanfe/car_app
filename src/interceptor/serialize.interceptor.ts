import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(DTO: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private DTO: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.DTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
