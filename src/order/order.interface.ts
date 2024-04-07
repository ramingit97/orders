export interface IOrder{
    name:string;
    description:string;
    userId:string;
    status?:OrderStatus;
}


export enum OrderStatus{
    Progress,
    Completed,
    Canceled
}