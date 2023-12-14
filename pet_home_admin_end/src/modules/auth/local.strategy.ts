import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const userWithoutPsw = await this.authService.validateUser(
      username,
      password,
    );
    if (!userWithoutPsw) {
      throw new UnauthorizedException();
    }
    return userWithoutPsw;
  }
}
