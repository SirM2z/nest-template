import { ArgumentMetadata, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { ApiErrorCode } from '../enums/api-error-code.enum';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class IntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    value = parseInt(value, 10);

    if (isNaN(value) || typeof value !== 'number' || value <= 0) {
      throw new ApiException('用户IDD无效', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
