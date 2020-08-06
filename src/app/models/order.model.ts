import { Customer } from './customer.model';

export class Order {
    orderID : number;
    customerID : number;
    orderState : number;
    customer: Customer;
    isNewCustomer: boolean;
}
