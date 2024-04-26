import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from '../../basket/basket.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent implements OnInit{
  @Input() appStepper: CdkStepper
  constructor(private basketService:BasketService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
}
