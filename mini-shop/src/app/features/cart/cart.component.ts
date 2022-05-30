import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public cart: CartService) { }

  ngOnInit(): void {
  }

  public locationSum(): any {
    return this.cart.items.map(tag => tag.book.price).reduce((a, b) => a + b, 0);
  }

}
