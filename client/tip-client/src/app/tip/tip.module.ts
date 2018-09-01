import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material/material.module';

import { UserPopupComponent } from './user-popup/user-popup.component';
import { TipComponent } from './tip.component';
import { TipHistoryComponent } from './tip-history/tip-history.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [TipComponent, UserPopupComponent, TipHistoryComponent],
  entryComponents: [UserPopupComponent]
})
export class TipModule { }
