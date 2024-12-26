import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'assets'), // Dùng để phục vụ tệp tĩnh từ thư mục 'assets'
      serveRoot: '/assets', // Truy cập tệp tĩnh thông qua /assets
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}