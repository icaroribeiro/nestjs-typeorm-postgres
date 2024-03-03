import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthGuard } from '../guards/auth.guard';
import { guardMock } from '../testing/guard.mock';
import { authServiceMock } from '../testing/auth-service.mock';
import { fileServiceMock } from '../testing/file-service.mock';
import { authLoginDTOMock } from '../testing/auth-login-dto.mock';
import { accessTokenMock } from '../testing/access-token.mock';
import { authRegisterDTOMock } from '../testing/auth-register-dto.mock';
import { authForgetDTOMock } from '../testing/auth-forget-dto.mock';
import { authResetDTOMock } from '../testing/auth-reset-dto.mock';
import { userEntityListMock } from '../testing/user-entity-list.mock';
import { getPhoto } from '../testing/get-photo.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validar a definição', () => {
    expect(authController).toBeDefined();
  });

  describe('Fluxo de autenticação', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTOMock);

      expect(result).toEqual({ accessTokenMock });
    });

    test('registern method', async () => {
      const result = await authController.register(authRegisterDTOMock);

      expect(result).toEqual({ accessTokenMock });
    });

    test('forget method', async () => {
      const result = await authController.forget(authForgetDTOMock);

      expect(result).toEqual({ success: true });
    });

    test('reset method', async () => {
      const result = await authController.reset(authResetDTOMock);

      expect(result).toEqual({ accessTokenMock });
    });
  });

  describe('Rotas autenticadas', () => {
    test('me method', async () => {
      const result = await authController.me(userEntityListMock[0]);

      expect(result).toEqual(userEntityListMock[0]);
    });

    test('uploadPhoto method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(
        userEntityListMock[0],
        photo,
      );

      expect(result).toEqual(photo);
    });
  });
});
