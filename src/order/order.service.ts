import { Injectable } from '@nestjs/common';
import { OrderCreateDto} from './dto/order-create.dto';
import {  OrderEntity } from './order.entity';
import { OrderRepository } from './repo/order.repository';
import { OrderStatus } from './order.interface';

@Injectable()
export class OrderService {

    constructor(
            private readonly orderRepo:OrderRepository
    ){}

    async create({name,description,userId,id}:OrderCreateDto){
        const newEntity = await new OrderEntity({
            id,
            name,
            description,
            userId
        });
        return await this.orderRepo.create(newEntity);
    }

    async getAll(){
        return await this.orderRepo.findAll();
    }

    async deleteAll(){
        return await this.orderRepo.findAll();
    }


    async cancel(id:number){
        const orderEntity = await new OrderEntity({})
        orderEntity.cancel();
        return await this.orderRepo.update(id,orderEntity);
    }

    async complete(id:number){
        const orderEntity = await new OrderEntity({})
        orderEntity.completed();
        return await this.orderRepo.update(id,orderEntity);
    }

}
