import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/Book';

const url = 'http://localhost/php-auth-api/index.php';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(url)
  }


  constructor(private http: HttpClient) { }
}
