import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { Public } from './decorator/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponse } from './schema/auth-response.schema';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from '../users/schema/user.schema';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: 200,
    description: 'Access token',
    type: AuthResponse,
  })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @ApiOperation({ summary: 'Sign up user' })
  @ApiResponse({
    status: 200,
    description: 'Signed up user',
    type: User,
  })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
