import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { VendorComponent } from './pages/vendor/vendor.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { MenuComponent } from './pages/menu/menu.component';
import { CustomerComponent } from './components/customer/customer.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { StatsComponent } from './components/stats/stats.component';
import { NotificationBarComponent } from './components/notification-bar/notification-bar.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    VendorComponent,
    CustomersComponent,
    MenuComponent,
    CustomerComponent,
    TicketComponent,
    StatsComponent,
    NotificationBarComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
