import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
// import { Role } from '../enums/role.enum';
// import { CreateUserDTO } from './dto/create-user.dto';
import { userEntityListMock } from '../testing/user-entity-list.mock';
import { createUserDTOMock } from '../testing/create-user-dto.mock';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { updatePutUserDTOMock } from '../testing/update-put-user-dto.mock';
import { updatePatchtUserDTOMock } from '../testing/update-patch-user-dto.mock';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userRepositoryMock],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  test('Validar a definição', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      jest.spyOn(userRepository, 'exists').mockResolvedValueOnce(false);

      const result = await userService.create(createUserDTOMock);

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Read', () => {
    test('method list', async () => {
      const result = await userService.list();

      expect(result).toEqual(userEntityListMock);
    });

    test('method show', async () => {
      const result = await userService.show(1);

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Update', () => {
    test('method update', async () => {
      const result = await userService.update(1, updatePutUserDTOMock);

      expect(result).toEqual(userEntityListMock[0]);
    });

    test('method updatePartial', async () => {
      const result = await userService.updatePartial(
        1,
        updatePatchtUserDTOMock,
      );

      expect(result).toEqual(userEntityListMock[0]);
    });
  });

  describe('Delete', () => {
    test('method delete', async () => {
      const result = await userService.delete(1);

      expect(result).toEqual(true);
    });
  });
});

// import { somar } from '../utils/somar';

// test('Este é o meu primeiro teste', () => {
//   const resultado = somar(5, 5);

//   expect(resultado).toEqual(10);
// });
