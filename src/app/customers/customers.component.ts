import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor(private api: ApiService) {

  }

  data: Customer[] = [];
  errorMessage: string = null;

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.api.getCustomers()
      .subscribe(res => {
        this.data = res;
        console.log(this.data);
        this.errorMessage = null;
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      });
  }

  delete(id: string) {
    this.api.deleteCustomer(id)
      .subscribe(res => {
        this.getAll();
        console.log(res);
        this.errorMessage = null;
      }, (err) => {
        console.error(err);
        this.errorMessage = err.message;
      });
  }

}
