import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrl: './checkout-address.component.scss'
})
export class CheckoutAddressComponent implements OnInit{
  @Input() checkoutForm: FormGroup;
  
  constructor() {}
  ngOnInit(): void {
  }
}
