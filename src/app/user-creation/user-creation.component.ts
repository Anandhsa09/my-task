import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AddressServiceService } from '../services/address-service.service';

interface detail {
  name: string,
  id: number
}

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent implements OnInit {
  contactForm: any;
  submitted = false;
  countryList: detail[] = [];
  stateList: any = [];
  cityList: any = [];
  stateByCountry: any = [];
  cityByState: any = [];
  isEdit = false;
  constructor(public dialogRef: MatDialogRef<UserCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private addressServiceService: AddressServiceService) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.getCountry();
    this.getState();
    this.getCity();
    this.bindData();
    console.log(this.data, 'data coing');
  }

  addUser() {
    this.submitted = true;
    console.log(this.contactForm, 'contact');
    if (this.contactForm.invalid) {
      return;
    }
    if (this.data === null) {
      const userDetail = {
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        email: this.contactForm.value.email,
        mobile: this.contactForm.value.mobile,
        address: this.contactForm.value.address,
        country: this.contactForm.value.country,
        state: this.contactForm.value.state,
        city: this.contactForm.value.city
      }
      const userObj = {
        flag: true,
        userDetail
      }
      this.dialogRef.close(userObj);
    } else {
      const userDetail = {
        firstName: this.contactForm.value.firstName,
        lastName: this.contactForm.value.lastName,
        email: this.contactForm.value.email,
        mobile: this.contactForm.value.mobile,
        address: this.contactForm.value.address,
        country: this.contactForm.value.country,
        state: this.contactForm.value.state,
        city: this.contactForm.value.city,
        userId: this.data.userId
      }
      const userObj = {
        flag: true,
        userDetail
      }
      this.dialogRef.close(userObj);
    }

  }

  get f() {
    return this.contactForm.controls;
  }

  getCountry() {
    this.addressServiceService.getCountry().subscribe((res: any) => {
      if (res) {
        this.countryList = res.map((item: any) => {
          return {
            id: item.id,
            name: item.name
          }
        })
      }
    });
  }

  getState() {
    this.addressServiceService.getState().subscribe((res: any) => {
      if (res) {
        this.stateList = res.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            countryId: item.country_id
          }
        })
      }
    });
  }

  getCity() {
    this.addressServiceService.getCity().subscribe((res: any) => {
      if (res) {
        this.cityList = res.map((item: any) => {
          return {
            id: item.id,
            name: item.name,
            stateId: item.state_id
          }
        })
      }
    });
  }

  getStateByCountry(event: any) {
    const userID = event.target.value;
    this.stateByCountry = this.stateList.filter((item: any) => item.countryId === +userID);
  }

  getCityByState(event: any) {
    const userID = event.target.value;
    this.cityByState = this.cityList.filter((item: any) => item.stateId === +userID);
  }

  bindData() {
    if (this.data !== null) {
      this.isEdit = true;
      this.contactForm.patchValue({
        firstName: this.data.firstName,
        lastName: this.data.lastName,
        mobile: this.data.mobile,
        email: this.data.email,
        address: this.data.address,
        country: +this.data.country
      });
      setTimeout(() => {
        this.bindStateByCountry(this.data.country);
      }, 2000);

    } else {
      this.isEdit = false;
    }
  }

  bindStateByCountry(countryID: any) {
    this.stateByCountry = this.stateList.filter((item: any) => item.countryId === +countryID);
    this.contactForm.patchValue({
      state: +this.data.state
    })
    this.bindCityByState(this.data.state);
  }

  bindCityByState(stateId: any) {
    this.cityByState = this.cityList.filter((item: any) => item.stateId === +stateId);
    this.contactForm.patchValue({
      city: +this.data.city
    })
  }

}
