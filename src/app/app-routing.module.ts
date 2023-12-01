import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HanziViewComponent } from './hanzi-view/hanzi-view.component';
import { PlayViewComponent } from './play-view/play-view.component';
import { WriteTheHanziViewComponent } from './write-the-hanzi-view/write-the-hanzi-view.component';
import { WriteTheHanziPlayComponent } from './write-the-hanzi-play/write-the-hanzi-play.component';

const routes: Routes = [
  { path: '', component: PlayViewComponent },
  { path: 'play', component: PlayViewComponent },
  { path: 'write-the-hanzi', component: WriteTheHanziViewComponent },
  { path: 'write-the-hanzi/:gamemode', component: WriteTheHanziPlayComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
