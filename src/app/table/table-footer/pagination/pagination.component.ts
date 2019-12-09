import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  totalRecords: number;

  @Output()
  itemsStartAndLimit = new EventEmitter();

  @Input()
  defaultNumberOfRows: number;

  @Input()
  tableDataStartIndex: number;

  @Input()
  paginationListToShow: number;

  @Input()
  showCurrentPage: number;

  pages = [];
  currentPage: number;
  startPoint: number;
  numberOfPagesToShow: number;
  pageDataStartIndex: number;
  isItPageSelectDropdown = false;

  rowData = [
    { id: 1, rowValue: 10 },
    { id: 2, rowValue: 25 },
    { id: 3, rowValue: 50 },
    { id: 4, rowValue: 100 }
  ];

  constructor() { }

  ngOnInit() {
    this.setRowLimit();
    this.changePage(this.currentPage);
  }

  ngOnChanges() {
    this.setTableDataStartPoint(this.tableDataStartIndex);
  }

  private setDisabledLink(selectedPage: number): boolean {
    if (this.currentPage === selectedPage) {
      return true;
    }
    return false;
  }

  /**
   * Below function is used to generate pages.
   */

  setRowLimit() {
    this.isItPageSelectDropdown = true;
    this.currentPage = this.showCurrentPage;
    this.numberOfPagesToShow = this.paginationListToShow;
    if (this.getTotalNumberOfPages() !== this.numberOfPagesToShow && true === this.isItPageSelectDropdown) {
      this.numberOfPagesToShow = (this.getTotalNumberOfPages() > this.numberOfPagesToShow) ?
        this.numberOfPagesToShow : this.getTotalNumberOfPages();
    } else {
      this.numberOfPagesToShow = this.numberOfPagesToShow;
    }
    this.changePage(this.currentPage);
    this.setTableDataStartPoint(this.tableDataStartIndex);
    this.numberOfPagesToShow = (this.numberOfPagesToShow % this.getTotalNumberOfPages() === 1) ?
      this.getTotalNumberOfPages() : this.numberOfPagesToShow;
    this.currentPage = this.getStartIndex();
    this.changePage(this.currentPage);
  }

  /**
   * Below function is used for to get previous page number.
   */

  private previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.currentPage < this.getTotalNumberOfPages() && false === this.pages.includes(1)) {
        this.pages.pop();
        this.pages.unshift(this.pages[0] - 1);
      }
      this.changePage(this.currentPage);
    }
  }

  /**
   * Below function is used for to get next page number.
   */

  private nextPage(): void {
    this.currentPage++;
    if (this.currentPage <= this.getTotalNumberOfPages() && false === this.pages.includes(this.getTotalNumberOfPages())) {
      this.pages.shift();
      const pageNo = this.pages[this.pages.length - 1] + 1;
      this.pages.push(pageNo);
    }
    this.changePage(this.currentPage);
  }

  /**
   *
   * @param pageNumber select page numbers
   */

  private changePage(selectedCurrentPage: number): void {
    if (selectedCurrentPage === 1) { this.currentPage = selectedCurrentPage; this.pages = []; }

    if (this.pages.length < this.numberOfPagesToShow) {
      for (let i = this.currentPage; i <= this.numberOfPagesToShow; i++) {
        this.pages.push(i);
      }
    } else {
      if (selectedCurrentPage === this.getTotalNumberOfPages()) {
        this.currentPage = this.getTotalNumberOfPages();
        this.pages = [];
        let i = this.getTotalNumberOfPages() - (this.numberOfPagesToShow - 1);
        for (; i <= this.getTotalNumberOfPages(); i++) {
          this.pages.push(i);
        }
      }

      if (this.currentPage > this.numberOfPagesToShow && this.currentPage < this.getTotalNumberOfPages()
        && true === this.isItPageSelectDropdown) {
        this.pages = [];
        const tempPageNumbers = (this.currentPage + 2 < this.getTotalNumberOfPages()) ?
          this.currentPage + 2 : this.getTotalNumberOfPages();
        for (let i = this.currentPage; i <= tempPageNumbers; i++) {
          this.pages.push(i);
        }
        this.isItPageSelectDropdown = false;
      } else {
        this.isItPageSelectDropdown = false;
      }
    }
    this.currentPage = selectedCurrentPage;
    this.getData(this.currentPage, this.defaultNumberOfRows);
  }

  /**
   * Below function is used to generate number of pages as per total count.
   */

  private getTotalNumberOfPages(): number {
    return Math.trunc(this.totalRecords / this.defaultNumberOfRows) + 1;
  }

  /**
   * Below function is used to get data from backend or array of object.
   * @param pageNumber
   * @param limit
   */

  private getData(pageNumber: number, limit: number): void {
    this.startPoint = (pageNumber - 1) * limit;
    // Below condition will get executed when there are more records than start point for the pagination
    this.emitStartAndLimit();
  }

  /**
   * Below function is used to emit the start point of chunk of data and count of records page need
   */

  private emitStartAndLimit(): void {
    if (this.totalRecords > this.startPoint) {
      this.itemsStartAndLimit.emit({ startPoint: this.startPoint, pageLimit: this.startPoint + this.defaultNumberOfRows });
    }
  }

  /**
   * Below function is used start point of selected page number from pagination list
   */

  private setTableDataStartPoint(startPoint: number) {
    this.pageDataStartIndex = Math.trunc((startPoint + 1) / this.defaultNumberOfRows) + 1;
  }

  private getStartIndex(): number {
    return this.pageDataStartIndex;
  }

}
