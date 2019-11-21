import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { TabledataService } from '../service/tabledata.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit, OnDestroy {
  tableData = [];
  allData = [];
  columnValue: any;
  loadService: any;
  defaultSortColName = 'amount';
  colIndex: number;
  sortOrder = 'ascending';
  isSortActive = true;
  loadingTableData = true;
  totalRecords: number;
  pageRestrict: number;
  pageStartPoint: number;
  defaultSelectValue = 10;

  constructor(private tableDataService: TabledataService, private cd: ChangeDetectorRef) { }

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
      this.tableData = res.body.data;
      this.allData = res.body.data;
      this.totalRecords = res.body.totalCount;
      this.getPageCount({ startPoint: 0, pageLimit: this.defaultSelectValue });
      this.defaultSort();
      this.loadingTableData = false;
    });
  }

  defaultSort() {
    this.ascSort(this.defaultSortColName);
  }

  ascSort(colHeader: string) {
    this.sortByKeyAsc(this.tableData, colHeader);
  }

  descSort(colHeader: string) {
    this.sortByKeyDesc(this.tableData, colHeader);
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

  /**
   * This function emit number of page limit and starting point of records
   * @param : event it is a object
   */

  getPageCount(event: { startPoint: any; pageLimit: any; }) {
    if (this.tableData.length > 0) {
      this.pageRestrict = event.pageLimit;
      this.pageStartPoint = event.startPoint;
      this.tableData = this.allData.slice(this.pageStartPoint, this.pageRestrict);
    }
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
