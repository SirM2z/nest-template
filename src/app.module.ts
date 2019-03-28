import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './feature/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './core/auth/auth.service';
import { AuthStrategy } from './core/auth/auth.strategy';
import { ConfigModule } from './core/config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, AuthStrategy],
})
export class AppModule {}
