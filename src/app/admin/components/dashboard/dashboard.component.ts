import { Component, OnInit } from '@angular/core';

import { ExcelService } from './../../../core/services/excel.service';
import { DataResolverService } from './../../services/data-resolver.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userList = [];

  constructor(
    private dataResolverService: DataResolverService,
    private excelService: ExcelService) { }

  ngOnInit(): void {
    this.dataResolverService.fetchUsers().subscribe(user => {
      this.getUserList(user);
    });
  }

  /**
   * get users 
   * @param users 
   */
  getUserList(users) {
    this.userList = users;
  }

  /**
   * change permission for users
   * @param val 
   * @param id 
   * @param permissionVal 
   */
  changePermission(val, id, permissionVal) {
    for (let i = 0; i < this.userList.length; i++) {
      if (this.userList[i].id === id) {
        switch (permissionVal) {
          case 'add': {
            this.userList[i].permissions.add = val;
            break;
          }
          case 'edit': {
            this.userList[i].permissions.edit = val;
            break;
          }
          case 'delete': {
            this.userList[i].permissions.delete = val;
            break;
          }
        }
        this.dataResolverService.updateUsers(this.userList[i], id).subscribe(_ => {
          console.log('data updated');
        }, error => {
          console.log('error:', error);
        })
      }
    }
  }

  /**
   * export users as pdf
   */
  exportUsersAsPdf() {
    let users = [];
    const pdf = {
      content: [
        { text: 'User List', style: 'header' },
        {
          table: {
            style: 'userTable',
            body: [
              ['ID', 'User', 'Add', 'Edit', 'Delete']
            ]
          }
        }],
      styles: {
        userTable: {
          margin: [0, 25, 0, 15]
        },
        header: {
          fontSize: 25,
          bold: true,
          margin: [0, 0, 50, 10]
        }
      },
    }
    this.userList.forEach(user => {
      const tempArr = [];
      if (user.role === 'user') {
        tempArr.push(user.id);
        tempArr.push(user.userName);
        tempArr.push(user.permissions.add === true ? 'yes' : 'no');
        tempArr.push(user.permissions.edit === true ? 'yes' : 'no');
        tempArr.push(user.permissions.delete === true ? 'yes' : 'no');
        pdf.content[1].table.body.push(tempArr);
      }
    });

    const documentDefinition = { content: pdf.content };
    pdfMake.createPdf(documentDefinition).open();
  }

  /**
   * export users as excel
   */
  exportUsersAsExcel() {
    let users = [];
    this.userList.forEach(user => {
      if (user.role === 'user') {
        users.push({ 'User Name': user.userName });
      }
    });
    this.excelService.exportAsExcelFile(users, 'sample');
  }
}
