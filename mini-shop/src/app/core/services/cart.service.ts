import { Injectable } from '@angular/core';
import { Book } from 'src/app/models/Book';
import { CartItem } from 'src/app/models/cart-item';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: CartItem[] = [];

  constructor(private auth: AuthService) { }

  plusToCart(book: Book): any {
    let index = this.items.findIndex(i => i.book.id === book.id);
    /* this.items.push({
      book: book,
      creationDate: Date.now()
    }) */

    if (!this.items[index]) {
      this.items = [
        ...this.items,
        {
          book: book,
          creationDate: Date.now(),
          count: 1
        }
      ]
    } else if (this.items[index]) {
      /* alert(`Hai gia aggiunto il seguente titolo: ${book.title}`) */
      this.increment(book);
    }

    console.log(this.items.length);
  }

  minusToCart(cartItem: CartItem): any {
    this.items = this.items.filter(item => item.creationDate !== cartItem.creationDate);
  }

  increment(book: Book): any {
    let index = this.items.findIndex(i => i.book.id === book.id)
    this.items[index].book.price += book.price / this.items[index].count;
    this.items[index].count++
  }

  decrement(book: Book): any {
    let index = this.items.findIndex(i => i.book.id === book.id)
    this.items[index].book.price -= book.price / this.items[index].count;
    this.items[index].count--

    if (this.items[index].count === 0) {
      this.minusToCart(this.items[index]);
    }
  }

  proceed(): any {
    /* window.alert(this.items.length); */
    console.log(`Utente: ${this.auth.data.name}
                  Email: ${this.auth.data.email}`);
  }


}
