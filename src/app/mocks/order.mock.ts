import { Order } from '../models/order.model';
import { customers } from '../mocks/customer.mock';


export const order: Order = {orderID: 1, orderState: -1, customerID: 1, isNewCustomer: true, customer: customers[0] };

export const orders: Order[] = [
    order,
    {orderID: 2, orderState: -1, customerID: 2, isNewCustomer: true, customer: customers[1]},
    {orderID: 3, orderState: -1, customerID: 3, isNewCustomer: true, customer: customers[2]},
    {orderID: 4, orderState: -1, customerID: 4, isNewCustomer: true, customer: customers[3]}
];
