import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { userEntityListMock } from './user-entity-list.mock';

export const userRepositoryMock = {
  provide: getRepositoryToken(UserEntity),
  useValue: {
    exists: jest.fn().mockResolvedValue(true),
    create: jest.fn(),
    save: jest.fn().mockResolvedValue(userEntityListMock[0]), // Usar o mockResolvedValue para resolver uma promise.
    find: jest.fn().mockResolvedValue(userEntityListMock),
    findOneBy: jest.fn().mockResolvedValue(userEntityListMock[0]),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
