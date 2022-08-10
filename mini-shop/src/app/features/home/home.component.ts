import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { BooksService } from 'src/app/core/services/books.service';
import { CartService } from 'src/app/core/services/cart.service';
import { Auth } from 'src/app/models/auth';
import { Book } from 'src/app/models/Book';

const url = 'http://localhost/php-auth-api/index.php';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  text: any;
  books!: Book[];
  active!: Book;
  error: any;
  currentUser!: Auth;

  constructor(private http: HttpClient, private cart: CartService, public auth: AuthService, private list: BooksService) {
    this.auth.user.subscribe(user => this.currentUser = user);
  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.list.getAll()
      .subscribe((res: Book[]) => {
        this.books = res;
        this.active = this.books[0];
      },
        err => this.error = err);
  }

  setActive(book: Book): any {
    this.active = book;
  }

  addToCart(active: Book): any {
    this.cart.plusToCart(active);

    if (!this.auth.isLogged()) {
      window.alert("Se vuoi acquistare questo testo fai Login!");
    }
  }

}
