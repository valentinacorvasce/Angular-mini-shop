import { Book } from "./Book";

export interface CartItem {
  book: Book;
  creationDate: number;
  count: number;
}
