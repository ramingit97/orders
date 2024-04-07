import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { OrderEntity } from "../order.entity";

@Injectable()
export class OrderRepository{
    constructor(
        @InjectRepository(OrderEntity) private orderRepo:Repository<OrderEntity>
    ){}

    async create(user:OrderEntity){
        return await this.orderRepo.save(user) 
    }

    async findAll(){
        return await this.orderRepo.find();
    }


    async findById(id:number){
        return await this.orderRepo.findOne({where:{id}});
    }

    async deleteAll(){
        return await this.orderRepo.delete({});
    }

    async update(id: number, updatedData: Partial<OrderEntity>) {
        const order = await this.orderRepo.findOne({ where: { id } });
        if (!order) {
            // Handle case where order with provided id doesn't exist
            return null;
        }
        await this.orderRepo.update({ id }, updatedData);
        return await this.orderRepo.findOne({ where: { id } });
    }
}