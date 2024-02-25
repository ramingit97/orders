import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { RmqService } from 'src/rmq/rmq.service';
import { OrderService } from './order.service';
import { OrderCreateDto } from './dto/order-create.dto';

@Controller('')
export class OrderController {
    
    constructor(private orderService:OrderService,
            private rmqService:RmqService
        ){}

    
    
    @MessagePattern("create")
    async createPost(@Payload() data:any){
        console.log('data222222222222',data);
        
        let result = await this.orderService.create(data);
        return result;
    }
    
    //     @MessagePattern("create_order")
    // async createPost(@Payload() data:any,@Ctx() context:RmqContext){
    //     let result = await this.orderService.create(data);
    //     this.rmqService.ack(context);
    // }



    @MessagePattern("list")
    async getOrders(@Payload() data:any){
        console.log('get all orders in order service');
    
        let result = await this.orderService.getAll();
        return result;
    }



    @MessagePattern("deleteAll")
    async deleteALl(@Payload() data:any){
        console.log('get 222all orders in order service');
        // let result = await this.orderService.deleteAll();
        // return result;
    }



}
