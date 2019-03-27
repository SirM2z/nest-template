import { Get, Post, Body, Controller, Inject, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './core/decorators/roles.decorator';
import { RolesGuard } from './core/guards/roles.guard';
import { Result } from './core/interface/result.interface';
import { AppService } from './app.service';
import { UserService } from './feature/user/user.service';
import { AuthService } from './core/auth/auth.service';
import { User } from './feature/user/entity/user.entity';
import { LoginDto } from './feature/user/dto/login.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(AuthService) private readonly authService: AuthService,
  ) {}

  @Get()
  root(): string {
    return this.appService.root();
  }

  /**
   * 用户登录成功后，返回的 data 是授权令牌
   * 在调用有 @UseGuards(AuthGuard()) 注解的路由时，会检查当前请求头中是否包含 Authorization: Bearer xxx 授权令牌，
   * 其中 Authorization 是用于告诉服务端本次请求有令牌，并且令牌前缀是 Bearer，而令牌的具体内容是登录之后返回的 data(accessToken)。
   * @param body 登录体 涵盖 登录账号 和 密码
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<Result> {
    await this.userService.login(loginDto.account, loginDto.password);
    const accessToken = await this.authService.createToken({ account: loginDto.account });
    return {code: 200, msg: '登录成功', data: accessToken};
  }

  /**
   * 用户注册
   * @param user 用户信息
   */
  @Post('register')
  async register(@Body() user: User): Promise<Result> {
    await this.userService.register(user);
    return { code: 200, msg: '注册成功' };
  }

  /**
   * 用户注册
   * @param user 用户信息
   */
  @Get('test')
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  test(): string {
    return 'Hello test jwt';
  }

  /**
   * 用户注册
   * @param user 用户信息
   */
  @Get('testfilter')
  testfilter(): string {
    throw new HttpException('用户编号错误', HttpStatus.BAD_REQUEST);
    return 'Hello test jwt';
  }
}
