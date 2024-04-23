import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../shared/Product';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  constructor(
    private shopService: ShopService,
    private route: ActivatedRoute,
    private bcService: BreadcrumbService
  ) {}
  ngOnInit(): void {}
  loadProduct() {
    this.shopService
      .getProduct(+this.route.snapshot.paramMap.get('id'))
      .subscribe((res) => {
        this.product = res;
        this.bcService.set('@ProductDetails', res.name);
      });
  }
}
