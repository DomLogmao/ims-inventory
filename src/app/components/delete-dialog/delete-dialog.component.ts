import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from 'src/app/shared/services/user/user.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule]

})
export class DeleteDialogComponent implements OnInit {

  btnOkText: string = "Delete";
  btnCloseText: string = "Close";
  title: string;
  message: string;
  obj: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.obj = this.data;
    this.title = this.data.title;
    this.message = this.data.message;
  }

  public delete() {
    if(this.obj.module) {
      if(this.obj.module === 'users') {
        this.userService.deleteUser(this.obj.user.userId).subscribe();
      }
    }
  }

}
