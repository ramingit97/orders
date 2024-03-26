import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './repo/order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { RmqService } from 'src/rmq/rmq.service';
import { Kafka } from 'kafkajs';
@Module({
    imports:[
        TypeOrmModule.forFeature([OrderEntity]),
    ],
    providers: [OrderService,OrderRepository,RmqService],
    controllers:[OrderController]
})
export class PostModule implements OnModuleInit{
    async onModuleInit() {
        const kafka = new Kafka({
          clientId: 'my-app',
          brokers: ['kafka-0:9092','kafka-1:9092'],
        });
  
        let admin = kafka.admin();
        const topics = await admin.listTopics();
    
        const topicList = [];
        console.log(topics,'topics');
        
        if (!topics.includes('orders')) {
          topicList.push({
            topic: 'orders',
            numPartitions: 5,
            replicationFactor: 2,
          });
        }

         if (topicList.length) {
            await admin.createTopics({
            topics: topicList,
            });
        }
    }
}
