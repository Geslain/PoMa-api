import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { createMockedUser } from './hepers/tests';

const mockUser = createMockedUser(1);

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const usersArray = [createMockedUser(1), createMockedUser(2)];

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
            update: jest.fn(),
            exec: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findById: jest.fn(),
            findByIdAndDelete: jest.fn(),
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

  it('should insert a new user', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockUser as any));
    const newUser = await service.create(mockUser);
    expect(model.create).toHaveBeenCalledWith(mockUser);
    expect(newUser).toEqual(mockUser);
  });

  it('should update an existing user', async () => {
    const userId = '1';
    jest.spyOn(model, 'findOneAndUpdate').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    const updatedUser = await service.update(userId, mockUser);
    expect(model.findOneAndUpdate).toHaveBeenCalledWith(
      { _id: userId },
      mockUser,
      { returnOriginal: false },
    );
    expect(updatedUser).toEqual(mockUser);
  });

  it('should return an existing user', async () => {
    const userId = '1';
    jest.spyOn(model, 'findById').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    const user = await service.findOne(userId);
    expect(model.findById).toHaveBeenCalledWith(userId);
    expect(user).toEqual(mockUser);
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(model.find).toHaveBeenCalled();
    expect(users).toEqual(usersArray);
  });

  it('should remove an existing user', async () => {
    const userId = '1';
    jest.spyOn(model, 'findByIdAndDelete').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockUser),
    } as any);

    const removedUser = await service.remove(userId);
    expect(model.findByIdAndDelete).toHaveBeenCalledWith({ _id: userId });
    expect(removedUser).toEqual(mockUser);
  });
});
