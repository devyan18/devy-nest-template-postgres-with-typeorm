import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth-dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type SignInResponse = {
  access_token: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginAuthDto): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id };
    return {
      access_token: await this.jwtService.sign(payload),
    };
  }

  async signUp({
    email,
    password,
    username,
  }: RegisterAuthDto): Promise<SignInResponse> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    const newUser = await this.usersService.create({
      email,
      password,
      username,
    });

    const payload = { id: newUser.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
