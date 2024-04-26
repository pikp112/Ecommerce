import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IDeliveryMethod } from '../../shared/DeliveryMethods';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService implements OnInit {
  baseUrl = environment.baseURL;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  get deliveryMethods() {
    return this.http
      .get(this.baseUrl + 'order/get-delivery-method')
      .pipe(
        map((dm: IDeliveryMethod[]) => dm.sort((a, b) => b.price - a.price))
      );
  }
}
