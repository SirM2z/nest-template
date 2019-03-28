import { Controller, Get, Inject, Post, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Roles } from '../../core/decorators/roles.decorator';
import { RolesGuard } from '../../core/guards/roles.guard';
import { Result } from '../../core/interface/result.interface';
import { IntPipe } from '../../core/pipes/int.pipe';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  async findAll(): Promise<Result> {
    const data = await this.userService.findAll();
    return { code: 200, msg: '查询所有用户成功', data };
  }

  @Get('test')
  index(): string {
    return 'hello world';
  }

  /**
   * 测试管道
   */
  @Get(':id')
  testpipe(@Param('id', new IntPipe()) id): string {
    return 'Hello test pipe';
  }
}
