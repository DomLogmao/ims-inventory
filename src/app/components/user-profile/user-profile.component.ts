import { Component, OnInit } from '@angular/core';
import { UserProfileMainComponent } from '../user-profile-main/user-profile-main.component';
import { UserProfileCardComponent } from '../user-profile-card/user-profile-card.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [UserProfileMainComponent,UserProfileCardComponent]
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
