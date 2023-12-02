export default interface OrderStatusItem{
    id: number;
    orderId: string;
    status: OrderStatus;
    customerId: number;
    orderDate: Date;
}

export enum OrderStatus{
    New,
    InProcess,
    Shipped,
    Delivered
}