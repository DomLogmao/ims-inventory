import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { UntypedFormControl, UntypedFormGroup, Validators, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile-change-password',
  templateUrl: './user-profile-change-password.component.html',
  styleUrls: ['./user-profile-change-password.component.scss'],
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule]
})
export class UserProfileChangePasswordComponent implements OnInit {

  public userPasswordGroup: UntypedFormGroup;
  id: any;

  constructor(private userService: UserService, private formbuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.id = localStorage.getItem("userId");
    this.userPasswordGroup = this.formbuilder.group({
      oldPassword: new UntypedFormControl('', [Validators.required]),
      newPassword: new UntypedFormControl('', [Validators.required]),
      confirmPassword: new UntypedFormControl('', [Validators.required]),
    }, {validator: this.checkPasswords });
  }

  changePassword() {
    let data: any;
    if (this.userPasswordGroup) {
      data = {
        id: Number(this.id),
        password: this.userPasswordGroup.value.oldPassword,
        newPassword: this.userPasswordGroup.value.newPassword
      }
    }
    if (data) {
      this.userService.changePassword(data).subscribe((data: any) => {
        this.ngOnInit();
      });
    }
  }

  checkPasswords(group: UntypedFormGroup) {
    const pass = group.controls.newPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true };
}

}
