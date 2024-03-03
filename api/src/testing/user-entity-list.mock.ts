import { Role } from '../enums/role.enum';
import { UserEntity } from '../user/entity/user.entity';

export const userEntityListMock: UserEntity[] = [
  {
    name: 'Joao Rangel',
    email: 'joao@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$eXmOqzV5PLm0uS97FzazIuNix92HcOeuEc2OxrLJUOIu0qoB9ciE2',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Glaucio Daniel',
    email: 'glaucio@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 2,
    password: '$2b$10$eXmOqzV5PLm0uS97FzazIuNix92HcOeuEc2OxrLJUOIu0qoB9ciE2',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Djalma Sindaux',
    email: 'djalma@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 3,
    password: '$2b$10$eXmOqzV5PLm0uS97FzazIuNix92HcOeuEc2OxrLJUOIu0qoB9ciE2',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
