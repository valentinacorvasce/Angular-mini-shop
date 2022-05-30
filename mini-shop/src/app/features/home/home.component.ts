import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Book } from 'src/app/models/Book';

const url = 'http://localhost:3000/books';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  text = "Ragazzi";
  books!: Book[];
  active!: Book;

  constructor(private http: HttpClient) {
    this.searchBooks(this.text);
  }

  searchBooks(text: string): any {
    this.http.get<Book[]>(`${url}?q=${text}`)
      .subscribe(res => {
        this.books = res
        this.text = text;
        this.active = this.books[0];
      })
  }

  setActive(book: Book): any {
    this.active = book;
  }

}
