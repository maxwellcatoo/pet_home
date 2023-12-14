import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/local_auth_guard';

@Controller()
export class AppController {
  constructor(
    // private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  // @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() body) {
    return this.authService.validateUser(body.account, body.password);
  }
}
