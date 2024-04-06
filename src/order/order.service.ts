import { Injectable } from '@nestjs/common';
import { OrderCreateDto} from './dto/order-create.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './repo/order.repository';

@Injectable()
export class OrderService {

    constructor(
            private readonly orderRepo:OrderRepository
    ){}

    async create({name,description,userId}:OrderCreateDto){
        const newEntity = await new OrderEntity({
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

}
