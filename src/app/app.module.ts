import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    GameSummaryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: "", component: GameSummaryComponent }
    ])
    //AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
