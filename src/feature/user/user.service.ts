import { Injectable, OnModuleInit, Inject, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CryptoTool } from '../../tools/crypto.tool';

@Injectable()
export class UserService implements OnModuleInit {
  async onModuleInit() {
    // 初始化系统管理员
    let admin = await this.findOneByAccount('admin');
    if (!admin) {
      admin = this.userRepo.create({
        account: 'admin',
        password: this.cryptoTool.encryptPassword('110110110'),
        name: '超级管理员',
        roles: ['admin'],
        isDisabled: false,
      });
      await this.userRepo.save(admin);
    }
  }

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoTool) private readonly cryptoTool: CryptoTool,
  ) {}

  /**
   * 用户登录
   * @param account 登录账号
   * @param password 登录密码
   */
  async login(account: string, password: string): Promise<void> {
    const user = await this.findOneByAccount(account);
    if (!user || !this.cryptoTool.checkPassword(password, user.password)) {
      throw new HttpException('账号密码有误', 406);
    }
  }

  /**
   * 用户注册
   * @param user 用户信息
   */
  async register(user: User): Promise<void> {
    const existing = await this.findOneByAccount(user.account);
    if (existing) throw new HttpException('账号已存在', 409);
    user.password = this.cryptoTool.encryptPassword(user.password);
    await this.userRepo.save(this.userRepo.create(user));
  }

  /**
   * 通过登录账号查询用户
   * @param account 登录账号
   */
  async findOneByAccount(account: string): Promise<User> {
    return await this.userRepo.findOne({account});
  }

  /**
   * 查询所有用户
   */
  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }
}
