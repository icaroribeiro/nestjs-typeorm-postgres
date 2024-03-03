import { Role } from '../enums/role.enum';
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto';

export const updatePutUserDTOMock: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'João Rangel',
  password: '123456',
  role: Role.User,
};
