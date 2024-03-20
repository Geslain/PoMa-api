import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/decorator/public.decorator';

@Controller()
export class AppController {
  @Public()
  @Get()
  getRoot(): string {
    return 'Go to <a href="/api">/api</a> for documentation';
  }

  @Public()
  @Get('/health')
  getHealth(): void {}
}
