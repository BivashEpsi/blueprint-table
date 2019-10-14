import { Component, OnInit } from '@angular/core';
import { TabledataService } from '../service/tabledata.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {
  allData: any;
  downarrow: boolean = true;
  uparrow: boolean;
  columnValue: {};
  constructor(private tabledataService : TabledataService) { }

  ngOnInit() {

    this.columnValue = [
      { key: 'date', value: 'Date' },
      { key: 'amount', value: 'Amount' },
      { key: 'phone', value: 'Phone' },
      { key: 'description', value: 'Description' }
    ]
    this.showData();
    
  }

  showData(){
    this.tabledataService.get_cuData().subscribe((res) => {
      this.allData = res.body;
    });
  }

  ascSort(columnHeader: string){
    debugger;
    this.sortByKeyasc(this.allData, columnHeader)
    this.downarrow = false;
    this.uparrow = true;
  }

  desSort(columnHeader: string){
    debugger;
    this.sortByKeyDsc(this.allData, columnHeader)
    this.downarrow = true;
    this.uparrow = false;
  }

    sortByKeyasc(array, key) {
          return array.sort(function(a, b) {
            var x = a[key];
            var y = b[key];
            return x < y ? -1 : x > y ? 1 : 0;
          });
        }   

      sortByKeyDsc(array, key) {
            return array.sort(function(a, b) {
              var x = a[key];
              var y = b[key];
              return x > y ? -1 : x > y ? 1 : 0;
            });
          } 
}
