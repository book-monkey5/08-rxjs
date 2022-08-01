import { Component } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  input$ = new Subject<string>();
  /*BS*/isLoading = false;/*BE*/
  results: Book[] = [];

  constructor(private service: BookStoreService) {
    this.input$.pipe(
      filter(term => term.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      /*BS*/tap(() => this.isLoading = true),/*BE*/
      switchMap(term => this.service.getAllSearch(term)),
      /*BS*/tap(() => this.isLoading = false)/*BE*/
    )
    .subscribe(books => {
      this.results = books;
    });
  }

}
