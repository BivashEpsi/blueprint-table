import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabledataService } from '../service/tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  allData: any;
  descending = false;
  ascending = true;
  columnValue: any;
  sortRowIndex: number;
  boolSortTypeCheck = true;
  loadService: any;

  constructor(private tableDataService: TabledataService) { }

  ngOnInit() {
    this.columnValue = [
      { key: 'date', value: 'Date' },
      { key: 'amount', value: 'Amount' },
      { key: 'phone', value: 'Phone' },
      { key: 'description', value: 'Description' }
    ];
    this.showData();
  }

  showData() {
    this.loadService = this.tableDataService.get_cuData().subscribe((res) => {
      this.allData = res.body;
    });
  }

  ascSort(columnHeader: string) {
    this.sortByKeyAsc(this.allData, columnHeader);
    this.descending = false;
    this.ascending = true;
    this.sortRowIndex = this.columnValue.findIndex(item => item.key === columnHeader);
  }

  descSort(columnHeader: string) {
    this.sortByKeyDesc(this.allData, columnHeader);
    this.descending = true;
    this.ascending = false;
    this.sortRowIndex = this.columnValue.findIndex(item => item.key === columnHeader);
  }

  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x > y ? -1 : x > y ? 1 : 0;
    });
  }

  getRowIndex(): number {
    return this.sortRowIndex;
  }

  getClassName(index: number, sortType: string): string {
    if (this.sortRowIndex === index && true === this.descending && 'desc' === sortType) {
      this.boolSortTypeCheck = true;
      return 'fa fa-caret-up';
    } else {
      this.boolSortTypeCheck = false;
      return 'fa fa-caret-down';
    }
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}