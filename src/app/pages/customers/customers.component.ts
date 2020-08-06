import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { CustomerStates } from 'src/app/enums/enums';
import { _Array } from 'src/app/utility/utility';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  public customers : Array<Customer>;

  public addingNew: boolean = false;

  newCustomer: Customer = new Customer();
  formErrors: string[] = [];

  constructor(private customersService: CustomerService, private notificationService: NotificationService) { }

  ngOnInit() {
    // Initial customers' state
    this.customersService.getCustomers()
      .subscribe((customers:Customer[]) => this.customers = customers);

    // Live customers' states
    this.customersService.customersChanged$
      .subscribe( (customer: Customer) => {
        switch(customer.customerState)
        {
          case CustomerStates.New:
            this.customers.push(customer);
            break;
          case CustomerStates.Ordering:
          case CustomerStates.Consuming:
          case CustomerStates.Rejected:
            this.customers = _Array.replace(this.customers, 
              this.customers.find(c => c.customerID == customer.customerID), 
              customer);
            break;
          default:
            console.log(customer);
            break;
        }
      });
  }

  toggleForm()
  {
    this.addingNew = ! (this.addingNew);
  }

  showForm()
  {
    this.addingNew = true;
  }

  hideForm()
  {
    this.addingNew = false;
  }

  formSubmitted(form)
  {
    let hasError: boolean = false;
    this.formErrors = [];
    this.newCustomer = form.value;
    if(this.newCustomer.consumptionRate <= 0 || this.newCustomer.consumptionRate >= 100)
    {
      this.throwError('Consumption Rate is out of range');
      hasError = true;
    }
    if(this.newCustomer.customerName.trim().length < 1)
    {
      this.throwError('Customer name cannot be empty');
      hasError = true;
    }
    if(!hasError)
    {
      this.addCustomer().subscribe( x => {
        this.hideForm();
      });
    }
  }

  addCustomer()
  {
    return this.customersService.createCustomer(this.newCustomer);
  }

  throwError(error:string)
  {
    this.formErrors.push(error);
    this.notificationService.popup('Form was not submitted');
  }
}
