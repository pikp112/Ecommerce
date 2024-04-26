import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDeliveryMethod } from '../../shared/DeliveryMethods';
import { CheckoutService } from '../checkout/checkout.service';
import { error } from 'console';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  deliveryMethod: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService) {}
  ngOnInit(): void {
    this.checkoutService.deliveryMethods.subscribe(
      (dm: IDeliveryMethod[]) => {
        this.deliveryMethod = dm;
        this.checkoutForm.get('deliveryForm').patchValue(this.deliveryMethod);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
