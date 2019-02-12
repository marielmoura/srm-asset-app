import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

const routes: Routes = [
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'List of Customers' }
  },
  {
    path: 'customers/add',
    component: CustomerAddComponent,
    data: { title: 'Add Customer' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
