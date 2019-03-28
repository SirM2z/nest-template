import { ArgumentMetadata, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class ApiParamsValidationPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // // 如果参数不是 类 而是普通的 JavaScript 对象则不进行验证
    // if (!metatype || !this.toValidate(metatype)) {
    //   return value;
    // }

    // 通过元数据和对象实例，去构建原有类型
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      // 获取到第一个没有通过验证的错误对象
      const error = errors.shift();
      const constraints = error.constraints;
      const contexts = error.contexts;

      // 将未通过验证的字段的错误信息和状态码，以ApiException的形式抛给我们的全局异常过滤器
      Object.keys(constraints).forEach((key) => {
        throw new ApiException(constraints[key], contexts[key].errorCode, HttpStatus.BAD_REQUEST);
      });
    }

    return value;
  }
}