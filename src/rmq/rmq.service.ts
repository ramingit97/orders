import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RmqContext, RmqOptions, Transport } from "@nestjs/microservices";

@Injectable()
export class RmqService{
    constructor(private readonly configService:ConfigService){

    }

    getOptions(queue:string,noAck:boolean=false):RmqOptions{
        return {
            transport:Transport.RMQ,
            options: {
                urls: ['amqp://rabbitmq:5672'],
                queue,
                noAck,
                persistent:true,
                queueOptions: { durable: true },
            },
        }
    }

    ack(context:RmqContext){
        const channel = context.getChannelRef();
        const originalMessage = context.getMessage();
        channel.ack(originalMessage);
    }
}