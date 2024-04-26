import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutAddressComponent } from '../checkout-address/checkout-address.component';
import { CheckoutDeliveryComponent } from '../checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from '../checkout-payment/checkout-payment.component';
import { CheckoutReviewComponent } from '../checkout-review/checkout-review.component';

@NgModule({
    declarations: [
        CheckoutComponent,
        CheckoutAddressComponent,
        CheckoutDeliveryComponent,
        CheckoutReviewComponent,
        CheckoutPaymentComponent
    ],
    imports: [
        CommonModule,
        CheckoutRoutingModule,
        SharedModule
    ]
})
export class CheckoutModule { }
