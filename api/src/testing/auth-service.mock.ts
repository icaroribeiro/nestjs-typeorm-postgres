import { AuthService } from '../auth/auth.service';
import { accessTokenMock } from './access-token.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({ accessTokenMock }),
    checkToken: jest.fn().mockReturnValue(jwtPayloadMock),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockReturnValue({ accessTokenMock }),
    forget: jest.fn().mockResolvedValue({ success: true }),
    reset: jest.fn().mockReturnValue({ accessTokenMock }),
    register: jest.fn().mockResolvedValue({ accessTokenMock }),
  },
};
