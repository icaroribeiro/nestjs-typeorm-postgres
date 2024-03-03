import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { userEntityListMock } from '../testing/user-entity-list.mock';
import { accessTokenMock } from '../testing/access-token.mock';
import { jwtPayloadMock } from '../testing/jwt-payload.mock';
import { resetTokenMock } from '../testing/reset-token.mock';
import { authRegisterDTOMock } from '../testing/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  test('Validar a definição', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('createToken method', () => {
      const result = authService.createToken(userEntityListMock[0]);

      expect(result).toEqual({ accessToken: accessTokenMock });
    });

    test('checkToken method', () => {
      const result = authService.checkToken(accessTokenMock);

      expect(result).toEqual(jwtPayloadMock);
    });

    test('isValidToken method', () => {
      const result = authService.isValidToken(accessTokenMock);

      expect(result).toEqual(true);
    });
  });

  describe('Autenticação', () => {
    test('login method', async () => {
      const result = await authService.login('joao@hcode.com.br', '123456');

      expect(result).toEqual({ accessToken: accessTokenMock });
    });

    test('forget method', async () => {
      const result = await authService.forget('joao@hcode.com.br');

      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authService.reset('654321', resetTokenMock);

      expect(result).toEqual({ accessToken: accessTokenMock });
    });

    test('register method', async () => {
      const result = await authService.register(authRegisterDTOMock);

      expect(result).toEqual({ accessToken: accessTokenMock });
    });
  });
});
