import { UserService } from '../user/user.service';
import { userEntityListMock } from './user-entity-list.mock';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    show: jest.fn().mockResolvedValue(userEntityListMock[0]),
    create: jest.fn().mockResolvedValue(userEntityListMock[0]),
    list: jest.fn().mockResolvedValue(userEntityListMock),
    update: jest.fn().mockResolvedValue(userEntityListMock[0]),
    updatePartial: jest.fn().mockResolvedValue(userEntityListMock[0]),
    delete: jest.fn().mockResolvedValue(true),
    exists: jest.fn().mockResolvedValue(true),
  },
};
