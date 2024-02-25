import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './repo/order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { RmqService } from 'src/rmq/rmq.service';
@Module({
    imports:[
        TypeOrmModule.forFeature([OrderEntity]),
    ],
    providers: [OrderService,OrderRepository,RmqService],
    controllers:[OrderController]
})
export class PostModule {}
