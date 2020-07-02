import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GameSummaryComponent,
    GameComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: "", component: GameSummaryComponent },
      { path: "game", component: GameComponent }
    ])
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
