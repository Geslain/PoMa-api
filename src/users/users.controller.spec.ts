import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  /**
   * Create mocked data for user
   *
   * @param id
   * @param withId
   */
  function createMockedUser(id: string | number, withId = false) {
    return {
      firstname: `foo${id}`,
      lastname: `bar${id}`,
      email: `foo.bar${id}@foobar.com`,
      password: `foobar${id}`,
      ...(withId && { _id: id.toString() }),
    };
  }

  const createUserDto: CreateUserDto = createMockedUser(1);
  const updateUserDto: UpdateUserDto = createMockedUser('Updated');
  const findOneId = 'findId';
  const findOnUser = createMockedUser(findOneId, true);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([
                createMockedUser(1),
                createMockedUser(2),
                createMockedUser(3),
              ]),
            create: jest.fn().mockResolvedValue(createUserDto),
            update: jest.fn().mockResolvedValue(updateUserDto),
            findOne: jest.fn().mockResolvedValue(findOnUser),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        // TODO fix this type conflict
        .mockResolvedValueOnce(createMockedUser(1) as any);

      await controller.create(createUserDto);
      expect(createSpy).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update()', () => {
    it('should update an user', async () => {
      const updateSpy = jest
        .spyOn(service, 'update')
        // TODO fix this type conflict
        .mockResolvedValueOnce(createMockedUser(1) as any);

      await controller.update('id', updateUserDto);
      expect(updateSpy).toHaveBeenCalledWith('id', updateUserDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      await expect(controller.findAll()).resolves.toEqual([
        createMockedUser(1),
        createMockedUser(2),
        createMockedUser(3),
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should return a user get by id parameter', async () => {
      await expect(controller.findOne(findOneId)).resolves.toEqual(
        createMockedUser(findOneId, true),
      );
      expect(service.findOne).toHaveBeenCalledWith(findOneId);
    });
  });
});
