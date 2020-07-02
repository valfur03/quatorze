import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  card_slots = [
    [1], [2], [3], [4],
    [5], [6], [7], [8],
    [9], [10], [11], [12]
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
