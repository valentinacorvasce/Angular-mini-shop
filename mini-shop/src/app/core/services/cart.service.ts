import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { CartItem } from 'src/app/models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  constructor() { }

  plusToCart(book: Book): any {
    /* this.items.push({
      book: book,
      creationDate: Date.now()
    }) */
    this.items = [
      ...this.items,
      {
        book: book,
        creationDate: Date.now()
      }
    ]
    console.log(this.items.length);
  }

  minusToCart(cartItem: CartItem): any {

  }


}
