import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-profile-card',
  templateUrl: './user-profile-card.component.html',
  styleUrls: ['./user-profile-card.component.scss'],
  standalone: true,
})
export class UserProfileCardComponent implements OnInit {

  public firstname: string;
  public lastname: string;
  public role: string;
  public username: string;
  public lastLogin: string;
  avatar: any;
  id: number;

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const id = localStorage.getItem("userId");
    if (id) {
      this.userService.getUserById(Number(id)).subscribe((data: any) => {
          this.id = data.userId,
          this.avatar = 'data:image/png;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(data.imgSrc) as any).changingThisBreaksApplicationSecurity,
          this.firstname = data.firstname,
          this.lastname = data.lastname,
          this.role = data.roles[0],
          this.username = data.username,
          this.lastLogin = data.lastLogin
      });
    }

  }

  onFileChanged(event: any) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.avatar = reader.result as string;
    }

    const data = {
      id : this.id,
      imageFile : event.target.files[0]
    }
    this.userService.uploadPhoto(data).subscribe((data: any) => {
      window.location.reload();
    });
  }

}
