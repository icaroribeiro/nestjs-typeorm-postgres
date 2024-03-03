import { Test, TestingModule } from '@nestjs/testing';
import { userServiceMock } from '../testing/user-service.mock';
import { UserController } from './user.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { RoleGuard } from '../guards/role.guard';
import { UserService } from './user.service';
// import { CreateUserDTO } from './dto/create-user.dto';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { userEntityListMock } from '../testing/user-entity-list.mock';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { updatePatchtUserDTOMock } from '../testing/update-patch-user-dto.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .overrideGuard(RoleGuard)
      .useValue(guardMock)
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  test('Validar a definição', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('Teste da aplicação dos Guards neste controle', () => {
    test('Se os guards estão aplicados', () => {
      const guards = Reflect.getMetadata('__guards__', UserController);

      expect(guards.length).toEqual(2);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
      expect(new guards[1]()).toBeInstanceOf(RoleGuard);
    });
  });

  describe('Create', () => {
    test('create method', async () => {
      const result = await userController.create(createUserDTOMock);

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Read', () => {
    test('list method', async () => {
      const result = await userController.list();

      expect(result).toEqual(userEntityListMock);
    });

    test('show method', async () => {
      const result = await userController.show(1);

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Update', () => {
    test('update method', async () => {
      const result = await userController.update(updatePutUserDTOMock, 1);

      expect(result).toEqual(userEntityListMock[0]);
    });

    test('updatePartial method', async () => {
      const result = await userController.updatePartial(
        updatePatchtUserDTOMock,
        1,
      );

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Delete', () => {
    test('delete method', async () => {
      const result = await userController.delete(1);

      expect(result).toEqual({ success: true });
    });
  });
});
