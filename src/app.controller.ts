import { Controller, Get, Query, Param, Res } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import * as path from 'path';
import * as moment from 'moment-timezone';

@ApiTags('Example API')
@Controller('api')
export class AppController {

  // 1. API trả về lời chào
  @Get('hello')
  @ApiOperation({ summary: 'Say Hello', description: 'Trả về 1 lời chào. Nếu không cung cấp tên sẽ trả về "Hello World!".' })
  @ApiQuery({ name: 'name', required: false, description: 'Tên (Không bắt buộc)' })
  @ApiResponse({ status: 200, description: 'Trả về lời chào thành công.' })
  getHello(@Query('name') name?: string): string {
    return name ? `Hello ${name}. Welcome to my API!` : 'Hello World!';
  }

  // 2. API trả về lời chào tạm biệt, tham số nhập vào là bắt buộc
  @Get('goodbye/:name')
  @ApiOperation({ summary: 'Say Goodbye', description: 'Trả về 1 lời chào tạm biệt.' })
  @ApiParam({ name: 'name', description: 'Tên (bắt buộc)' })
  @ApiResponse({ status: 200, description: 'Trả về lời chào tạm biệt thành công.' })
  getGoodbye(@Param('name') name: string): string {
    return `Goodbye ${name}!`;
  }

  // 3. API trả về tổng của 2 số, với tham số `a` và `b` từ query string
  @Get('sum')
  @ApiOperation({ summary: 'Calculate Sum', description: 'Trả về tổng của 2 số.' })
  @ApiQuery({ name: 'a', type: Number, description: 'Nhập tham số thứ nhất', required: true })
  @ApiQuery({ name: 'b', type: Number, description: 'Nhập tham số thứ hai', required: true })
  @ApiResponse({ 
    status: 200, 
    description: 'Tính tổng thành công.',
    schema: {
      example: 'Tổng của 3 và 4 là 7.'
    }
  })
  getSum(@Query('a') a: string, @Query('b') b: string): string {
    const sum = Number(a) + Number(b);
    return `Tổng của ${a} và ${b} là ${sum}.`;
  }

  // 4. API trả về giờ Hà Nội 
  @Get('time')
  @ApiOperation({ summary: 'Get Hanoi Time', description: 'Trả về giờ hiện tại ở Hà Nội.' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lấy thành công giờ hiện tại ở Hà Nội.', 
    schema: {
      example: 'Giờ hiện tại ở Hà Nội là: 2024-12-26 10:30:00'
    }
  })
  getTime(): string {
    const hanoiTime = moment.tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    return `Giờ hiện tại ở Hà Nội là: ${hanoiTime}`;
  }

  // 5. API trả về một hình ảnh 
  @Get('image')
  @ApiOperation({ summary: 'Get Sample Image', description: 'Trả về ảnh lấy từ một nguồn.' })
  @ApiResponse({
    status: 200,
    description: 'Trả về ảnh thành công.',
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  getImage(@Res() res: Response): void {
    const imagePath = path.join(process.cwd(), 'assets', 'sample.png');
    res.sendFile(imagePath);
  }
}
