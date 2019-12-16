import { Component, OnInit, OnChanges, Input } from "@angular/core";

@Component({
  selector: "bp-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnChanges {

  @Input() data = [];
  @Input() columnInfo: any;
  @Input() isTableLoading = true;

  // Data
  filteredData = [];
  tableData = [];

  // Sorting
  defaultSortColName = "amount";
  colIndex: number;
  sortOrder = "ascending";
  isSortActive = true;

  // Pagination
  startIndex: number;
  endIndex: number;
  totalRecords: number;
  numberOfRows;
  currentPage = 1;
  pageBuffer = 1;
  defaultNumberOfRows = 10;

  //column selector
  showColumnSelector = true;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    if (changes.isTableLoading && changes.isTableLoading.currentValue === false && this.data.length > 0) {
      this.filteredData = [...this.data];
      this.totalRecords = this.data.length;
      this.paginate({currentPage: this.currentPage, numberOfRows: this.defaultNumberOfRows});
      this.defaultSort();
    }
  }

  // --------------- Sorting ---------------

  defaultSort() {
    this.ascSort(this.defaultSortColName);
  }

  ascSort(colHeader: string) {
    this.sortByKeyAsc(this.filteredData, colHeader);
  }

  descSort(colHeader: string) {
    this.sortByKeyDesc(this.filteredData, colHeader);
  }

  sortByKeyAsc(array, key) {
    return array.sort(function(a, b) {
      const x = a[key];
      const y = b[key];
      return x < y ? -1 : 1;
    });
  }

  sortByKeyDesc(array, key) {
    return array.sort(function(a, b) {
      const x = a[key];
      const y = b[key];
      return x > y ? -1 : 1;
    });
  }

  getAriaSortOrder(rowIndex: number): string {
    const columnIndex = this.columnInfo.findIndex(
      (item: { key: string }, index: any) => {
        if (item.key === this.defaultSortColName) {
          return index;
        }
      }
    );
    if (columnIndex === rowIndex) {
      return "ascending";
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
    if (
      (this.defaultSortColName !== colHeader &&
        typeof this.sortOrder !== "undefined") ||
      this.sortOrder === "" ||
      this.sortOrder === "descending"
    ) {
      this.ascSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = "ascending";
      this.defaultSortColName = colHeader;
    } else {
      this.descSort(colHeader);
      this.isSortActive = true;
      this.sortOrder = "descending";
      this.defaultSortColName = "";
    }
    this.paginate({currentPage: this.currentPage, numberOfRows: this.numberOfRows});
  }

  // --------------- Searching ---------------

  search(query) {
    this.filteredData = this.data
      .filter(d => {
        for (let col of this.columnInfo) {
          if (d[col.key] && String(d[col.key]).includes(query)) {
            return true;
          }
        }
        return false;
      });
      this.totalRecords = this.filteredData.length;
      this.paginate({currentPage: 1, numberOfRows: this.numberOfRows});
  }

  clearSearch() {
    this.filteredData = [...this.data];
    this.totalRecords = this.filteredData.length;
    this.paginate({currentPage: 1, numberOfRows: this.numberOfRows});
    this.defaultSort();
  }

  // --------------- Pagination ---------------

  paginate(pageData: {
    currentPage: number;
    numberOfRows: number;
  }) {
    if (pageData.numberOfRows !== this.numberOfRows) {
      this.currentPage = Math.floor(this.startIndex / pageData.numberOfRows) + 1 || 1;
    } else {
      this.currentPage = pageData.currentPage;
    }
    this.numberOfRows = pageData.numberOfRows;
    this.startIndex = (this.currentPage - 1) * this.numberOfRows;
    this.endIndex = this.startIndex + this.numberOfRows;
    this.tableData = this.filteredData.slice(this.startIndex, this.endIndex);
  }
}
