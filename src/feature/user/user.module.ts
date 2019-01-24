import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { CryptoTool } from '../../tools/crypto.tool';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
  ],
  controllers: [UserController],
  providers: [UserService, CryptoTool],
  exports: [UserService],
})
export class UserModule {}
