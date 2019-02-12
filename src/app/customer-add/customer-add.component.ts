import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.css']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  risks: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
  ) { }

  createForm() {
    const numberPatern = '^[0-9.,]+$';
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      creditLimit: ['', [Validators.required, Validators.pattern(numberPatern)]],
      risk: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.createForm();
    this.getRisks();
  }

  onFormSubmit(form: NgForm) {
    this.api.addCustomer(form.value)
      .subscribe(res => {
        console.log(res);
        this.router.navigate(['/customers']);
      }, (err) => {
        console.error(err);
      });
  }

  getRisks() {
    this.api.getRisks()
      .subscribe(res => {
        console.log(res);
        this.risks = res;
      }, (err) => {
        console.error(err);
      });
  }



}
