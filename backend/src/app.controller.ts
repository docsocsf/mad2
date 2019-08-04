import { Controller, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';

type RequestJson = { [key: string]: any }

@Controller('api/signup')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/fresher')
  registerFresher(@Body() body: RequestJson): {fullName: string} {
    return {
      fullName: body.student.firstName + " " + body.student.lastName
    };
  }
}
