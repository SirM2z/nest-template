import * as util from 'util';
import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { View } from '../libs/View';

@Injectable()
export class ViewInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    // 拿到 response 对象
    const response = context.switchToHttp().getResponse();

    // 将 render 回调函数转成一个 promisify 然后绑定执行的上下文
    const render = util.promisify(response.render.bind(response));

    // 请自行了解什么是 Rxjs
    return call$.pipe(map(async value => {

        if (value instanceof View) {
            // 返回渲染后的 html
            value = await render(value.name, value.data);
        }

        return value;
    }));

  }
}
