import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.createCheckoutForm();
  }
  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        street: ['',Validators.required],
        city: ['',Validators.required],
        state: ['',Validators.required],
        zip: ['',Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['',Validators.required],
      }),
      paymentForm: this.fb.group({
        nameOnCard: ['',Validators.required],
      }),
    });
  }
}
