import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  

  // @MessagePattern('create_post')
  // public async createToken(@Payload() data: any) {
  //   console.log('data',data);
  //   return {
  //     name:"Ramin",
  //     status:true
  //   }
  // } 
}
