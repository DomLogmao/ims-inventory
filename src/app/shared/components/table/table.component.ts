import { Component, OnInit, Input, Output } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true
})
export class TableComponent implements OnInit {
  @Input() config: any;
  headers: any;

  keyObject: any;

  sampleJson: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {

    this.keyObject = this.config.data; //OBJECT KEYS
    this.headers = this.config.headers; //HEADERS

    //GET OBJECT KEYS
    this.config.data.forEach((element : any) => {
      this.keyObject = Object.keys(element);
    });
  }
}
