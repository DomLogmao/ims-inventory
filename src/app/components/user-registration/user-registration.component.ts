import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
// import { psgc } from 'ph-locations';

// const {
//   regions,
//   provinces,
//   citiesMunicipalities,
// } = psgc;

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss'],
  standalone: true,
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule]
})
export class UserRegistrationComponent implements OnInit {

  public userProfileGroup: UntypedFormGroup;

  selectedRegion: string;
  regions: any = [{}];
  selectedProvince: string;
  provinces: any = [{}];
  selectedCity: string;
  cities: any = [{}];

  constructor() { }

  ngOnInit(): void {
  }

  regionChange(event: Event) {
    let data: any = event;
    let filtered: any = [];

    if(data.code != undefined) {
    //  this.provinces = psgc.provinces.filter((element: any) => element.region == data.code);
    }
   }

   provinceChange(event: Event) {
     let data: any = event;
     let filtered: any = [];

    //  this.cities = psgc.citiesMunicipalities.filter((element: any) => element.province == data.code);
    }

}
