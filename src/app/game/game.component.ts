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
  pairs = 0;

  codes = {
    "A": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "0": 10,
    "J": 11,
    "Q": 12,
    "K": 13
  }

  first_card = { "code": "0", "value": 0, "index": 0 };
  sec_card = { "code": "0", "value": 0, "index": 0 };

  timeout_id;

  constructor(private card: CardsService) { }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.pairs = 0;
    this.first_card = { "code": "0", "value": 0, "index": 0 };
    this.sec_card = { "code": "0", "value": 0, "index": 0 };
    document.getElementById("result").innerHTML = "";

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
        }
      });
    });
  }

  selCard(code: string, index) {
    // this.codes[code[0]]

    document.getElementById(code).className = "sel";

    if (code != undefined) {
      if (this.first_card.code == "0") {
        this.first_card.code = code;
        this.first_card.value = this.codes[code[0]];
        this.first_card.index = index;
      } else {
        if (this.first_card.code == code) {
          document.getElementById(code).classList.remove("sel");
          this.first_card = { "code": "0", "value": 0, "index": 0 };
        } else {
          this.sec_card.code = code;
          this.sec_card.value = this.codes[code[0]];
          this.sec_card.index = index;
          var sum = this.first_card.value + this.sec_card.value;

          this.checkCards(sum, this.first_card.index, this.sec_card.index);

          document.getElementById(this.first_card.code).classList.remove("sel");
          document.getElementById(this.sec_card.code).classList.remove("sel");
  
          this.first_card = { "code": "0", "value": 0, "index": 0 };
          this.sec_card = { "code": "0", "value": 0, "index": 0 };

          if (this.checkLose() && this.pairs < 26) {
            document.getElementById("result").innerHTML = "Vous avez perdu non?";
          } else if (this.checkLose() && this.pairs == 26) {
            document.getElementById("result").innerHTML = "Vous avez gagné!";
          }
        }
      }
    }
  }

  checkCards(sum: number, index1: number, index2: number) {
    if (sum != 14) {
      alert("La somme des deux cartes doit faire 14!");
    } else {
      this.card_slots[index1].shift();
      this.card_slots[index2].shift();

      this.pairs++;
    }
  }

  checkLose() {
    var lost = true;

    this.card_slots.forEach((card, key) => {
      if(card.length > 0) {
        for (var i = key + 1; i < 12; i++) {
          if (this.card_slots[i].length > 0) {
            //console.log(this.codes[card[0].code[0]] + " + " + this.codes[this.card_slots[i][0].code[0]] + " = " + (parseInt(this.codes[card[0].code[0]]) + parseInt(this.codes[this.card_slots[i][0].code[0]])));
            if ((this.codes[card[0].code[0]] + this.codes[this.card_slots[i][0].code[0]]) == 14) {
              lost = false;
            }
          }
        }
      }
    });

    return lost;
  }

  mouseEnter(div, index) {
    if (!this.timeout_id) {
      var card_slots = this.card_slots;
      this.timeout_id = window.setTimeout(function() {
          this.timeout_id = null; // EDIT: added this line
          if (document.getElementById(div) && card_slots[index].length > 1) document.getElementById(div).setAttribute("src", card_slots[index][1].image);
      }, 1000);
    }
  }

  mouseLeave(div, index) {
    document.getElementById(div).setAttribute("src", this.card_slots[index][0].image);
    if (this.timeout_id) {
        window.clearTimeout(this.timeout_id);
        this.timeout_id = null;
    }
  }

}
