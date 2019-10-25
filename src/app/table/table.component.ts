import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabledataService } from '../service/tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy {
  allData: [] = [];
  columnValue: any;
  loadService: any;
  defaultSortColName  = 'amount';
  colIndex: number;
  sortOrder: string;
  isSortActive = false;

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
      this.defaultSort();
    });
  }

  defaultSort() {
    this.ascSort(this.defaultSortColName);
  }

  ascSort(colHeader: string) {
    this.sortByKeyAsc(this.allData, colHeader);
  }

  descSort(colHeader: string) {
    this.sortByKeyDesc(this.allData, colHeader);
  }

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x > y ? -1 : x > y ? 1 : 0;
    });
  }

  getAriaSortOrder(rowIndex: number): string {
    if (this.colIndex === rowIndex) {
      this.isSortActive = true;
      return this.sortOrder;
    } else {
      return null;
    }
  }

  applySort(colHeader: string, colIndex: number) {
    this.colIndex = colIndex;
    if (this.sortOrder === undefined || this.sortOrder === '' || this.sortOrder === 'descending') {
      this.ascSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = 'ascending';
    } else {
      this.descSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = 'descending';
    }
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
