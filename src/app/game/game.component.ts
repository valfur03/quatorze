import { Component, OnInit } from '@angular/core';

import { CardsService } from '../cards.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  number_cards = [
    5, 5, 5, 5,
    4, 4, 4, 4,
    4, 4, 4, 4
  ];
  card_slots;

  constructor(private card: CardsService) { }

  ngOnInit(): void {
    this.card.shuffle().subscribe(() => {
      this.card.getNewStack().subscribe(data => {
        if (data.success) {
          var cards = data.cards;
          this.card_slots = [];

          this.number_cards.forEach((card_number, key) => {
            this.card_slots.push([]);
            for (var i = 0; i < card_number; i++) {
              this.card_slots[key].push(cards.shift());
            }
          });

          console.log(this.card_slots);
        }
      });
    });
  }

}
