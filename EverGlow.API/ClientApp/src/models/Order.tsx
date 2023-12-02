import Customer from "./Customer";
import OrderNote from "./OrderNote";
import OrderStatusItem from "./OrderStatusItem";
import OrderedItem from "./OrderedItem";

export default interface Order{
    orderStatusItem: OrderStatusItem;
    customer: Customer;
    orderedItems: OrderedItem[];
    orderNotes: OrderNote[];
}