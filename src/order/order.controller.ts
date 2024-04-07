import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext } from '@nestjs/microservices';
import { RmqService } from 'src/rmq/rmq.service';
import { OrderService } from './order.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { readFileSync } from 'fs';


@Controller('')
export class OrderController {
    
    constructor(private orderService:OrderService,
            private rmqService:RmqService,
            private eventEmitter: EventEmitter2
    ){}

    @MessagePattern("list")
    async list(){
      let res = await this.orderService.getAll();
      return res;
    }
    @MessagePattern("orders.create")
    async create_order(@Payload() data:any){
        let result = await this.orderService.create(data);
        console.log("result222",result);
        return result;
    }

    @MessagePattern("orders.cancel")
    async cancel_order(@Payload() {id}:{id:number}){
        console.log("iddd222",id);
        
        let result = await this.orderService.cancel(id);
        return result;
    }


    @EventPattern("orders.create")
    async createPostEvent(@Payload() data:any){
        console.log('2222',data);
    }
    
    @MessagePattern("orders")
    async createPost2(@Payload() data:any,@Ctx() context:KafkaContext){
        // let eventType = context.getMessage().headers['eventType'] as string;
        // this.eventEmitter.emit(eventType, data);
        console.log(`Partition - ${context.getPartition()} - ${context.getConsumer()}`);
        // console.log("data get",data);
        // return {result:'ramin'};

      return {
        headers: {
          kafka_nestRealm: "ramin"
        },
        key: "ramin",
        value: {result:"ramin"}
      }
        // this.getHome()
    }

    @OnEvent("orders.create")
    async createPost3(data){
        console.log("2222222222");
    }

    @OnEvent("orders.update")
    async updatePost(data){
        console.log("3333333333");
    }


    // @EventPattern("orders.reply")
    // async getOrders(@Payload() data:any,@Ctx() context:KafkaContext){
    //     console.log("list",data);
    //     console.log(context.getMessage());
    // }



    // @EventPattern("deleteAll")
    // async deleteALl(@Payload() data:any){
    //     this.getHome()
    //     // let result = await this.orderService.deleteAll();
    //     // return result;
    // }


    async getHome(){
        try {
          const containerIdFilePath = '/proc/1/cgroup';
          const content = readFileSync(containerIdFilePath, 'utf-8');
          const matches = content.match(/\/docker\/([a-f0-9]+)/);
          let containerId = "";
          if (matches && matches.length > 1) {
            containerId = matches[1];
            console.log('Container ID:', containerId);
          } else {
            console.log('Unable to determine Container ID.');
          }
          return containerId
        } catch (err) {
          console.error('Error reading container ID:', err);
        }
      }


}
