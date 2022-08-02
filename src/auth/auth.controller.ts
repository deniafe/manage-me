import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto, SigninDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  sigin( @Body() dto: SigninDto ) { 
    return this.authService.sigin(dto)
  }

  @Post('signup')
  sigup( @Body() dto: SignupDto ) {
    return this.authService.signup(dto)
  }

}
