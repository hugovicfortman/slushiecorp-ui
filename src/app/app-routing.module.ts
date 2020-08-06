import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MenuComponent } from 'src/app/pages/menu/menu.component';
import { VendorComponent } from 'src/app/pages/vendor/vendor.component';
import { CustomersComponent } from 'src/app/pages/customers/customers.component';

const routes: Routes = [
      { path: '' , component : MenuComponent },
      { path: 'vendor' , component : VendorComponent },
      { path: 'customers', component : CustomersComponent }
];

@NgModule({
      imports: [
        RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { } 