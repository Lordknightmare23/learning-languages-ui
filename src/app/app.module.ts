import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HanziViewComponent } from './hanzi-view/hanzi-view.component';
import { PlayViewComponent } from './play-view/play-view.component';
import { WriteTheHanziViewComponent } from './write-the-hanzi-view/write-the-hanzi-view.component';
import { WriteTheHanziPlayComponent } from './write-the-hanzi-play/write-the-hanzi-play.component';
import { DatePipe } from './date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HanziViewComponent,
    PlayViewComponent,
    WriteTheHanziViewComponent,
    WriteTheHanziPlayComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
