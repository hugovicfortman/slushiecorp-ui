import { Customer } from "../models/customer.model";
import { CustomerStates } from '../enums/enums';

export const customer: Customer = {customerID: 1, customerName: 'House Stark', customerState: CustomerStates.New, satisfactionLevel: 100, consumptionRate: 5, slushieLevel: 100};

export const customers: Array<Customer> = [
    customer,
    {customerID: 2, customerName: 'House Frey', consumptionRate: 50, customerState: CustomerStates.New, satisfactionLevel: 100, slushieLevel: 100},
    {customerID: 3, customerName: 'House Lannister', consumptionRate: 10, customerState: CustomerStates.New, satisfactionLevel: 100, slushieLevel: 90},
    {customerID: 4, customerName: 'House Baratheon', consumptionRate: 2, customerState: CustomerStates.New, satisfactionLevel: 100, slushieLevel: 80},
    {customerID: 5, customerName: 'House Tyrel', consumptionRate: 2, customerState: CustomerStates.New, satisfactionLevel: 100, slushieLevel: 70}
];
