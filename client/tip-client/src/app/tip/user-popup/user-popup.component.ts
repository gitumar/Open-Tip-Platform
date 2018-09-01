
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tc-user-popup',
  templateUrl: './user-popup.component.html',
  styleUrls: ['./user-popup.component.css']
})
export class UserPopupComponent {
  pool: string;
  poolUserValidation = new FormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<UserPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) {
  }

  public pooUserCloseForm(): void {
    this.dialogRef.close({
      username: this.params.username,
      pool: this.params.pool
    });
  }
}
