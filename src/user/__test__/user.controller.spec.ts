import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { AuthService } from '../auth-service';
import { User } from '../user.entity';
import { forwardRef } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;

  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      // signIn: (email, password) => {},
      // signUp: (email, password) => {},
    };

    fakeUserService = {
      findOne: (id: number) => {
        return Promise.resolve({ id, email: '', password: '' } as User);
      },
      find: (email: string) =>
        Promise.resolve([{ id: 1, email: email, password: '' } as User]),
      // remove: () => {},
      // update: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useValue: fakeAuthService },
        { provide: AuthService, useValue: fakeAuthService },
        ,
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
