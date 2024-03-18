import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

const mockUser = {
  firstname: 'foo1',
  lastname: 'bar1',
  email: 'foo.bar1@foobar.com',
  password: 'foobar123',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [
    {
      firstname: 'foo1',
      lastname: 'bar1',
      email: 'foo.bar1@foobar.com',
      password: 'foobar123',
    },
    {
      firstname: 'foo2',
      lastname: 'bar2',
      email: 'foo.bar2@foobar.com',
      password: 'foobar456',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        firstname: 'foo1',
        lastname: 'bar1',
        email: 'foo.bar1@foobar.com',
        password: 'foobar123',
      } as any),
    );
    const newUser = await service.create({
      firstname: 'foo1',
      lastname: 'bar1',
      email: 'foo.bar1@foobar.com',
      password: 'foobar123',
    });
    expect(newUser).toEqual(mockUser);
  });
});
