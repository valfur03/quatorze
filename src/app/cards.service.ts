import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  card_stack = [];

  constructor(private http: HttpClient) { }

  shuffle() {
    return this.http.get("https://deckofcardsapi.com/api/deck/now3xelx3yxk/shuffle/");
  }

  getNewStack() {
    return this.http.get<any>("https://deckofcardsapi.com/api/deck/now3xelx3yxk/draw/?count=52");
  }

  getStack() {
    return this.card_stack;
  }

  setStack(cards) {
    this.card_stack = cards;
    console.log(this.card_stack);
  }
}
