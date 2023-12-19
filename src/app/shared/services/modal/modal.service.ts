
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',

})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar){}

  onSuccess(duration = 3, message: string){
    this.snackBar.open(message,'', {
      duration: duration,
      panelClass: ['success'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onError(duration = 3, message: string){
    this.snackBar.open(message,'', {
      duration: duration,
      panelClass: ['mat-toolbar', 'mat-warn'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  onWarning(duration = 3, message: string){
    this.snackBar.open(message,'', {
      duration: duration,
      panelClass: [ 'warning'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}

