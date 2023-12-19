import {
  Component,
  AfterViewInit,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { createPopper } from '@popperjs/core';
import { UserService } from 'src/app/shared/services/user/user.service';
import { AuthenticationService } from 'src/app/shared/services/auth/authentication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EventService } from 'src/app/shared/services/event/event.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss'],
})
export class TopnavComponent implements OnInit, AfterViewInit {
  dropdownPopoverShow = false;
  event: any;
  @ViewChild('btnDropdownRef', { static: false }) btnDropdownRef: ElementRef;
  @ViewChild('popoverDropdownRef', { static: false })
  popoverDropdownRef: ElementRef;
  avatar: any;
  firstname: string;
  lastname: string;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private eventService: EventService
  ) {

   this.eventService.getId().subscribe(id => {

      this.userService.getUserById(Number(id)).subscribe((data: any) => {
        (this.avatar =
          'data:image/png;base64,' +
          (this.sanitizer.bypassSecurityTrustResourceUrl(data.imgSrc) as any)
            .changingThisBreaksApplicationSecurity),
          (this.firstname = data.firstname),
          (this.lastname = data.lastname);
      });
  });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: 'bottom-start',
      }
    );
  }

  toggleDropdown(event: any) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  logout() {
    this.authService.logout();
  }
}
