import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  toLanguage = {
    "language": "Français",
    "code": "fr"
  };

  constructor() { }

  ngOnInit(): void {
    if (window.location.hostname.split(".")[0] == "fr") {
      this.toLanguage.language = "English";
      this.toLanguage.code = "en";
    } else if (window.location.hostname.split(".")[0] != "en") {
      window.location.replace("https://fr.quatorze.valfur.fr");
    }
  }

}
