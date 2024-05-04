import { Test } from '@nestjs/testing';
import { AuthService } from '../auth-service';
import { UserService } from '../user.service';
import { User } from '../user.entity';

let service: AuthService;
let fakeUsersService: Partial<UserService>;

beforeEach(async () => {
  // create fake user service

  let Users: User[] = [];

  fakeUsersService = {
    find: () => {
      const filteredUser = Users.filter((user) => user.email);
      return Promise.resolve(filteredUser);
    },
    create: (email: string, password: string) => {
      const user = {
        email,
        password,
        id: Math.floor(Math.random() * 9999999),
      } as User;
      Users.push(user);
      return Promise.resolve(user);
    },
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      // this help reroute user_service
      {
        provide: UserService,
        useValue: fakeUsersService,
      },
    ],
  }).compile();
  service = module.get(AuthService);
});

describe('Auth Service', () => {
  it('can create an instance of auth servcice', async () => {
    expect(service).toBeDefined();
  });
  it('can sign up successfully by hashing password', async () => {
    const user = await service.signUp(
      'ademolapamilerin192@gmail.com',
      'Adeakanfe@123',
    );
    expect(user.password).not.toEqual('Adeakanfe@123');
    const [hash, salt] = user.password.split('.');
    expect(hash).toBeDefined();
    expect(salt).toBeDefined();
  });
  it('can sign up successfully and create user', async () => {
    const user = await service.signUp(
      'ademolapamilerin192@gmail.com',
      'Adeakanfe@123',
    );
    expect(user.id).toBeDefined();
  });

  it('can sign up successfully and throws error with already in use email', async () => {
    await service.signUp('ademolapamilerin192@gmail.com', 'Adeakanfe@123');
    try {
      await service.signUp('ademolapamilerin192@gmail.com', 'Adeakanfe@123');
      throw new Error('failed');
    } catch (error) {
      expect(error.status).toEqual(400);
    }
  });

  it('cannot signin successfully cause email does not exist', async () => {
    try {
      await service.signIn('ademola@gmail.com', 'Ademola@123');
      throw new Error('');
    } catch (error) {
      expect(error.status).toEqual(400);
    }
  });

  it('can signin withcorrect details', async () => {
    try {
      await service.signUp('ademolapamilerin192@gmail.com', 'Adeakanfe@123');
      const user = await service.signIn(
        'ademolapamilerin192@gmail.com',
        'Adeakanfe@123',
      );
      expect(user.id).toBeDefined();
    } catch (error) {
      // expect(error).toBeDefined();
    }
  });
});
