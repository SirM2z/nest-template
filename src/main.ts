import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { ApiParamsValidationPipe } from './core/pipes/api-params-validation.pipe';
import { ViewInterceptor } from './core/interceptor/view.interceptor';
// 模板引擎
import { static as resource } from 'express';
import * as art from 'express-art-template';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 处理静态文件
  app.use('/static', resource('resource'));

  // 指定模板引擎
  app.engine('art', art);

  // 设置模板引擎的配置项
  app.set('view options', {
      debug: process.env.NODE_ENV !== 'production',
      minimize: true,
      rules: [
        { test: /<%(#?)((?:==|=#|[=-])?)[ \t]*([\w\W]*?)[ \t]*(-?)%>/ },
        { test: /{%([@#]?)[ \t]*(\/?)([\w\W]*?)[ \t]*%}/ },
     ],
  });

  // 设置视图文件的所在目录
  app.setBaseViewsDir('resource/views');

  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ApiParamsValidationPipe());
  app.useGlobalInterceptors(new ViewInterceptor());
  await app.listen(3001);
}
bootstrap();
