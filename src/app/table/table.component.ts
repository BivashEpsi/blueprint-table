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
  sortRowIndex: number;
  boolSortTypeCheck = true;
  loadService: any;
  sortOrder: string;
  iconbutton: boolean;
  columnRowHeaderIndex: number;
  setToggleClassSortOrder: string;
  ariaSort = 'none';
  ariaSortCheck = false;
  defultSortColumnName  = 'amount';
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
      this.defultSort();
    });
  }

  ascSort(columnHeader: string) {
    this.sortByKeyAsc(this.allData, columnHeader);
  }

  descSort(columnHeader: string) {
    this.sortByKeyDesc(this.allData, columnHeader);
  }

  sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x > y ? -1 : x > y ? 1 : 0;
    });
  }

  sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
      const x = a[key];
      const y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  applySort(columnHeader: string, columnIndex: number) {
    this.columnRowHeaderIndex = columnIndex;
    if (this.sortOrder === undefined || this.sortOrder === '' || this.sortOrder === 'desc') {
      this.sortOrder = 'asc';
      this.ascSort(columnHeader);
      this.setToggleClassSortOrder = 'ascending active';
      this.ariaSort = 'ascending';
    } else {
      this.sortOrder = 'desc';
      this.descSort(columnHeader);
      this.setToggleClassSortOrder = 'descending active';
      this.ariaSort = 'descending';
    }
  }

  getToggleClassOrAriaSort(rowIndex: number, type: string = 'aria'): string {
    if (this.columnRowHeaderIndex === rowIndex) {
      this.ariaSortCheck = true;
      return ('aria' === type) ? this.ariaSort : this.setToggleClassSortOrder;
    } else {
      return ('aria' === type) ? null : 'descending';
    }
  }

  defultSort() {
    this.ascSort(this.defultSortColumnName);
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
