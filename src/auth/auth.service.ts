import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(signInDto.email);
    if (user?.password !== signInDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    console.log(password);
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }
}
