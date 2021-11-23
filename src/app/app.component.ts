import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserCreationComponent } from './user-creation/user-creation.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'user-detail';
  displayedColumns: string[] = ['name', 'email', 'mobile', 'address', 'lat', 'lang', 'actions'];
  public dataSource!: MatTableDataSource<any>;
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
    this.dataSource = this.userList;
    this.dataSource.paginator = this.paginator;
  }

  addUser() {
    const dialogRef = this.dialog.open(UserCreationComponent);
  }
}
