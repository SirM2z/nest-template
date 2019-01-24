import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../feature/user/user.service';
import { User } from '../../feature/user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {}

  createToken(payload: { account: string }): string {
    return this.jwtService.sign(payload);
  }

  async validateUser(payload: { account: string }): Promise<User> {
    return await this.userService.findOneByAccount(payload.account);
  }
}
