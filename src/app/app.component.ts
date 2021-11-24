import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserCreationComponent } from './user-creation/user-creation.component';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'user-detail';
  displayedColumns: string[] = ['name', 'email', 'mobile', 'address', 'lat', 'lang', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  userList: any = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userList = [
      {
        name: 'anandh',
        email: 'anandhsa9@gmail.com',
        mobile: '9486044676',
        address: '248',
        lat: '345',
        lang: '4546'
      },
      {
        name: 'anandh as',
        email: 'anandhsa9@gmail.com',
        mobile: '9486044676',
        address: '248',
        lat: '345',
        lang: '4546'
      }
    ]
    this.userList.forEach((item: any, index: number) => {
      item.userId = index + 1;
    });
    this.dataSource.data = this.userList;
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    const dialogRef = this.dialog.open(UserCreationComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'result');
      if (result) {
        this.dataSource.data = [];
        this.userList.push({
          name: result.userDetail.firstName + '' + result.userDetail.lastName,
          email: result.userDetail.email,
          mobile: result.userDetail.mobile,
          address: result.userDetail.address,
          lat: '4543',
          lang: '435345346',
          country: result.userDetail.country,
          state: result.userDetail.state,
          city: result.userDetail.city,
          firstName: result.userDetail.firstName,
          lastName: result.userDetail.lastName
        })
        this.userList.forEach((item: any, index: number) => {
          item.userId = index + 1;
        });
        this.dataSource = this.userList;
      }
    });
  }

  deleteUser(user: any) {
    console.log(user);
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      data: user.userId
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataSource.data = [];
        this.userList = this.userList.filter((item: any) => item.userId !== +result.userID);
        this.dataSource = this.userList;
      }
    });
  }

  editUser(user: any) {
    const dialogRef = this.dialog.open(UserCreationComponent, {
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result, 'result');
      if (result) {
        // this.dataSource.data = [];
        // this.userList.push({
        //   name: result.userDetail.firstName + '' + result.userDetail.lastName,
        //   email: result.userDetail.email,
        //   mobile: result.userDetail.mobile,
        //   address: result.userDetail.address,
        //   lat: '4543',
        //   lang: '435345346',
        //   country: result.userDetail.country,
        //   state: result.userDetail.state,
        //   city: result.userDetail.city,
        //   firstName: result.userDetail.firstName,
        //   lastName: result.userDetail.lastName
        // })
        // this.userList.forEach((item: any, index: number) => {
        //   item.userId = index + 1;
        // });
        // this.dataSource = this.userList;
      }
    });
  }
}
