import { Role } from '../enums/role.enum';
import { CreateUserDTO } from '../user/dto/create-user.dto';

export const createUserDTOMock: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'João Rangel',
  password: '123456',
  role: Role.User,
};
