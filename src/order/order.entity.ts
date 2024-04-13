import {Entity,Column,PrimaryGeneratedColumn,PrimaryColumn} from 'typeorm'
import { IOrder, OrderStatus } from './order.interface';




@Entity('order')
export class OrderEntity implements IOrder {

    // @PrimaryGeneratedColumn()
    @PrimaryColumn("uuid")
    id:number;

    @Column()
    name:string;

    @Column()
    description:string;


    @Column("enum",{
        nullable:true,
        default:undefined,
        enum:OrderStatus,
    })
    status:OrderStatus;


    @Column()
    userId:string;

    constructor(post:Partial<IOrder>){
        if(post){
            console.log("post",post);
            Object.assign(this,post)
            this.status = post.status??OrderStatus.Progress;
        }
    }

    async cancel(){
        this.status = OrderStatus.Canceled;
    }

    async completed(){
        this.status = OrderStatus.Completed;
    }
  
}
