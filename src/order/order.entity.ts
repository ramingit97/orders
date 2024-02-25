import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'
import { IOrder } from './order.interface';


@Entity('order')
export class OrderEntity implements IOrder {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;


    @Column()
    userId:string;

    constructor(post:IOrder){
        if(post){
            this.name = post.name;
            this.description = post.description;
            this.userId = post.userId;
        }
    }
  
}
