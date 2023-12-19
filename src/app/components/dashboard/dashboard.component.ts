import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true
})
export class DashboardComponent implements OnInit {

  hamburgerOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleHamburger(): void {
    this.hamburgerOpen = !this.hamburgerOpen;
  }

}
