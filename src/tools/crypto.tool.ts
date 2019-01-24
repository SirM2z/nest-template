import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class CryptoTool {
  /**
   * 加密密码
   * @param password 密码
   */
  encryptPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  /**
   * 校验加密密码是否正确
   * @param password 密码
   * @param encryptedPassword 加密密码
   */
  checkPassword(password: string, encryptedPassword: string): boolean {
    const currentPass = this.encryptPassword(password);
    if (currentPass === encryptedPassword) {
      return true;
    }
    return false;
  }
}
