import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './Components/stepper/stepper.component';
import { BasketSummaryComponent } from './Components/basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrderTotalsComponent,
    StepperComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    FormsModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    CdkStepperModule,
    StepperComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
