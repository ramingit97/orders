import { Body, Controller, Get, Header, Headers, HttpException, HttpStatus, Inject, NotFoundException, Post, Request, Res, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientKafka, Ctx, EventPattern, KafkaContext, MessagePattern, Payload, RmqContext, RpcException, TcpContext, Transport } from '@nestjs/microservices';
import { RmqService } from 'src/rmq/rmq.service';
import { OrderService } from './order.service';
import { OrderCreateDto } from './dto/order-create.dto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { readFileSync } from 'fs';
import { client1 } from 'src/main';


const settime  = ()=>{
  return new Promise((res)=>{
    setTimeout(()=>{
      res(100);
    },20000);
  })
}

@Controller('')
export class OrderController {
  
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'consumer-orders', // hero-client
        brokers: ['kafka-0:9092','kafka-1:9092'],
      },
      consumer: {
        groupId: 'consumer-orders' // hero-consumer-client
      }
    }
  })
  client: ClientKafka;


    constructor(private orderService:OrderService,
            private rmqService:RmqService,
            private eventEmitter: EventEmitter2,
    ){}

    @MessagePattern("list")
    async list(){
      let res = await this.orderService.getAll();
      return res;
    }
    @MessagePattern("orders.create")
    async create_order(@Payload() data:any){
        let result = await this.orderService.create(data);
        return result;
    }

    @MessagePattern("orders.cancel")
    async cancel_order(@Payload() {id}:{id:number}){
        let result = await this.orderService.cancel(id);
        return result;
    }

    @MessagePattern("orders.completed")
    async complete_order(@Payload() {id}:{id:number}){
        let result = await this.orderService.complete(id);
        return result;
    }


    @EventPattern("orders.create")
    async createPostEvent(@Payload() data:any){
        console.log('2222',data);
    }
    
    @EventPattern("orders")
    async createPost2(@Payload() data:any,@Ctx() context:KafkaContext){
        // let eventType = context.getMessage().headers['eventType'] as string;
        // this.eventEmitter.emit(eventType, data);
        console.log(`Partition - ${context.getPartition()} - ${context.getConsumer()}`);
        // console.log("data get",data);
        // return {result:'ramin'};
        // const { offset } = context.getMessage();
        // console.log("fffff222",offset);


        const { offset } = context.getMessage();
        const partition = context.getPartition();
        const topic = context.getTopic();
        // await this.client.commitOffsets([
        //   {topic,partition,offset}
        // ])

        console.log('offset',offset);
        

        context.getConsumer().commitOffsets([
          { topic, partition, offset: (Number(offset) + 1).toString()  }
        ])
        // await this.client.commitOffsets([{ topic, partition, offset }])
        

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
