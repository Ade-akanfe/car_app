import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Authentication system', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles signup request', async () => {
    const emailVal = 'ademola11@gmail.com';
    return request(app.getHttpServer())
      .post('/auth/create')
      .send({
        email: emailVal,
        password: 'ade@123agA',
      })
      .expect(201)
      .then((res) => {
        const { email, id } = res.body;
        console.log(id);
        expect(id).toBeDefined();
        expect(email).toEqual(emailVal);
      })
      .catch((error) => {
        console.error(error);
      });
  });
  it('handl signup request', async () => {
    const emailVal = 'ademola11@gmail.com';
    const res = await request(app.getHttpServer()).post('/auth/create').send({
      email: emailVal,
      password: 'ade@123agA',
    });
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/current')
      .set('Cookie', cookie)
      .expect(200);
    expect(body.email).toBe(emailVal);
  });
});
