import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import {CommonModule, formatDate } from '@angular/common';
import { regions, provinces, municipalities, barangays } from "psgc";
import { NgSelectModule } from '@ng-select/ng-select';

// const {
//   regions,
//   provinces,
//   citiesMunicipalities,
// } = psgc;


@Component({
  selector: 'app-user-profile-main',
  templateUrl: './user-profile-main.component.html',
  styleUrls: ['./user-profile-main.component.scss'],
  standalone: true,
  imports: [NgSelectModule, CommonModule, ReactiveFormsModule]
})
export class UserProfileMainComponent implements OnInit {

  public userProfileGroup: UntypedFormGroup;
  user: User;
  public allowEdit: boolean = true;

  selectedRegion: string;
  regions: any = [{}];
  selectedProvince: string;
  provinces: any = [{}];
  selectedCity: string;
  cities: any = [{}];

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userProfileGroup = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.maxLength(20), Validators.email]),
      firstname: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      lastname: new UntypedFormControl('', [Validators.required, Validators.maxLength(20)]),
      mobileNo: new UntypedFormControl('', [Validators.required, Validators.maxLength(11), Validators.pattern("^[0-9]*$"),]),
      telephoneNo: new UntypedFormControl('', [ Validators.maxLength(7), Validators.pattern("^[0-9]*$"),]),
      address: new UntypedFormControl('', [Validators.maxLength(50)]),
      city: new UntypedFormControl('', [Validators.maxLength(20)]),
      province: new UntypedFormControl('', [Validators.maxLength(20)]),
      region: new UntypedFormControl('', [Validators.maxLength(20)]),
      postalCode: new UntypedFormControl('', [Validators.maxLength(4)]),
      country: new UntypedFormControl('', [Validators.maxLength(20)]),
    });

    const id = localStorage.getItem("userId");
    if (id) {
      this.userService.getUserById(Number(id)).subscribe((data: any) => {
        this.userProfileGroup.setValue({
          email: data.email,
          firstname: data.firstname,
          lastname: data.lastname,
          mobileNo: data.mobileNo,
          telephoneNo: data.telephoneNo,
          address: data.addresses[0].address,
          city: data.addresses[0].city,
          province: data.addresses[0].province,
          region: data.addresses[0].region,
          postalCode: data.addresses[0].postalCode,
          country: data.addresses[0].country
        });

      });
    }


    this.regions = regions;
  }

  submitUserProfileGroup(userFormValue: User) {
    console.log(userFormValue);
    //this.userService.saveUser(userFormValue);
  }

  enable(e: any) {
    if (e.target.checked) {
      this.allowEdit = false;
    } else {
      this.allowEdit = true;
    }
  }

  regionChange(event: Event) {
   let data: any = event;
   let filtered: any = [];

   if(data.code != undefined) {
    // this.provinces = provinces.filter('Agoo');
   }
  }

  provinceChange(event: Event) {
    let data: any = event;
    let filtered: any = [];

    // this.cities = municipalities.filter(x  => {
    //   if(x == data.code){
    //     return x;
    //   }
    // });
   }

}
