import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem } from '../shared/Basket';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{
  basket$: Observable<IBasket>;

  constructor(private basketService:BasketService) { }

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
  incrementBasketItemQuantity(item: IBasketItem) {
    this.basketService.incremenBasketItemQuantity(item);
  }
  decrementBasketitemQuantity(item: IBasketItem) {
    this.basketService.decrementBasketItemQuantity(item);
  }
  removeBasketitem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }
}
