import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipComponent } from './tip/tip.component';
import { TipHistoryComponent } from './tip/tip-history/tip-history.component';

const routes: Routes = [
  {
    path: '', component: TipComponent
  },
  {
    path: 'tip-history', component: TipHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
