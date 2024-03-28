import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    const isMatch = await user.comparePassword(signInDto.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.email };
    return {
      user,
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
