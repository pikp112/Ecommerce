import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../../Basket';
import { BasketService } from '../../../basket/basket.service';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrl: './basket-summary.component.scss'
})
export class BasketSummaryComponent implements OnInit{
  basket$: Observable<IBasket>;
  @Output() decrement:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove:EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Input() isBasket: boolean = true;

  constructor(private basketService:BasketService) {}

  ngOnInit(): void {
  }

  decrementItemQuantity(item:IBasketItem){
    this.decrement.emit(item);
  }
  incrementItemQuantity(item:IBasketItem){
    this.increment.emit(item);
  }
  removeBasketItem(item:IBasketItem){
    this.remove.emit(item);
  }
}
