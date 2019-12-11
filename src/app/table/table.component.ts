import { Component, OnInit, OnDestroy } from "@angular/core";
import { TabledataService } from "../service/tabledata.service";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit, OnDestroy {
  allData = [];
  filteredData = [];
  tableData = [];

  columnValue: any;
  loadService: any;
  defaultSortColName = "amount";
  colIndex: number;
  sortOrder = "ascending";
  isSortActive = true;
  loadingTableData = true;

  // Pagination
  totalRecords: number;
  numberOfRows;
  currentPage = 1;
  pageBuffer = 1;
  defaultNumberOfRows = 10;

  constructor(private tableDataService: TabledataService) {}

  ngOnInit() {
    this.columnValue = [
      { key: "date", value: "Date" },
      { key: "amount", value: "Amount" },
      { key: "phone", value: "Phone" },
      { key: "description", value: "Description" }
    ];
    this.showData();
  }

  showData() {
    this.loadService = this.tableDataService.get_cuData().subscribe(res => {
      this.allData = res.body.data;
      this.filteredData = res.body.data;
      this.totalRecords = res.body.totalCount;
      this.paginate({currentPage: this.currentPage, numberOfRows: this.defaultNumberOfRows});
      this.defaultSort();
      this.loadingTableData = false;
    });
  }

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
    const columnIndex = this.columnValue.findIndex(
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

  search(query) {
    this.filteredData = this.allData
      .filter(d => {
        for (let col of this.columnValue) {
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
    this.filteredData = [...this.allData];
    this.totalRecords = this.filteredData.length;
    this.paginate({currentPage: 1, numberOfRows: this.numberOfRows});
    this.defaultSort();
  }

  paginate(pageData: {
    currentPage: number;
    numberOfRows: number;
  }) {
    this.currentPage = pageData.currentPage;
    this.numberOfRows = pageData.numberOfRows;
    let startIndex = (pageData.currentPage - 1) * pageData.numberOfRows;
    let endIndex = startIndex + pageData.numberOfRows;
    this.tableData = this.filteredData.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
