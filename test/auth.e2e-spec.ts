import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';

describe('Auth Controller (e2e)', () => {
  let app: INestApplication;

  const mockUserService = {
    findOneByEmail: () => ({
      comparePassword: (password: string) => {
        return password === 'good password';
      },
    }),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it('should succeed', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test', password: 'good password' })
        .expect(200);
    });

    it('should fail with code 401', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: 'test', password: 'wrong password' })
        .expect(401)
        .expect({
          message: 'Unauthorized',
          statusCode: 401,
        });
    });

    describe('should fail with code 400', () => {
      it('should fail without email', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ password: 'password' })
          .expect(400)
          .expect({
            message: ['email should not be empty'],
            error: 'Bad Request',
            statusCode: 400,
          });
      });

      it('should fail without password', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ email: 'email' })
          .expect(400)
          .expect({
            message: ['password should not be empty'],
            error: 'Bad Request',
            statusCode: 400,
          });
      });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
