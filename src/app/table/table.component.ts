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
  defaultSortColName = 'amount';
  colIndex: number;
  sortOrder = 'ascending';
  isSortActive = true;
  loadingTableData = true;

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
      this.loadingTableData = false;
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
    const columnIndex = this.columnValue.findIndex((item: { key: string; }, index: any) => {
      if (item.key === this.defaultSortColName) {
        return index;
      }
    });
    if (columnIndex === rowIndex) {
      return 'ascending';
    }
    if (this.colIndex === rowIndex) {
      this.isSortActive = true;
      return this.sortOrder;
    } else {
      return null;
    }
  }

  applySort(colHeader: string, colIndex: number) {
    this.colIndex = colIndex;
    if (this.defaultSortColName !== colHeader && typeof (this.sortOrder) !== 'undefined' ||
      this.sortOrder === '' || this.sortOrder === 'descending') {
      this.ascSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = 'ascending';
      this.defaultSortColName = colHeader;
    } else {
      this.descSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = 'descending';
      this.defaultSortColName = '';
    }
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
