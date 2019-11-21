import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {

  @Input()
  totalRecords: number;

  @Output()
  itemsStartAndLimit = new EventEmitter();

  @Input()
  defaultSelectValue: number;

  @Input()
  columnHeadersData: number;

  pages = [];
  goingReverse = false;
  currentPage = 1;
  numberOfPages: number;
  startPoint: number;
  noOfPagesToShow = 3;
  rowData = [
    { id: 1, rowValue: 10 },
    { id: 2, rowValue: 25 },
    { id: 3, rowValue: 50 },
    { id: 4, rowValue: 100 }
  ];

  constructor() { }

  ngOnInit() {
    this.setRowLimit();
  }

  /**
   * Below function is used to generate pages.
   */
  setRowLimit() {
    this.goingReverse = false;
    this.numberOfPages = Math.ceil(this.totalRecords / this.defaultSelectValue);
    this.generatePaginationNumber();

    if (this.currentPage >= this.numberOfPages) {
      this.currentPage = this.numberOfPages;
      this.changePage(this.numberOfPages);
    } else {
      this.changePage(this.currentPage);
    }
  }

  /**
   * generatePagination number
   * @param pageNumber
   */
  generatePaginationNumber() {
    this.pages = [];
    let pageLimit = this.currentPage;
    if (this.goingReverse) {
      for (let i = this.currentPage - 2; i <= pageLimit; i++) {
        this.pages.push(i);
      }
    } else {
      // Here I is initial point to generate pages for pagination
      let i = this.currentPage % this.noOfPagesToShow === 2 ? this.currentPage - 1 :
        this.currentPage % this.noOfPagesToShow === 0 ? this.currentPage - 2 : this.currentPage;

      // below if condition is to identify current page and number of pages are equal then start I (start point from previous 2 number)
      if (this.currentPage === this.numberOfPages) {
        i = this.checkLastDividableNotThree();
      }
      pageLimit = this.numberOfPages < this.noOfPagesToShow ? this.numberOfPages : this.currentPage + 2;
      if (pageLimit > this.numberOfPages) {
        pageLimit = this.currentPage + (this.numberOfPages - this.currentPage);
      } else if (pageLimit !== this.numberOfPages && pageLimit % this.noOfPagesToShow !== 0) {
        const finalVal = (pageLimit % this.noOfPagesToShow === 1) ? 2 : 1;
        pageLimit = i + finalVal;
      }
      // As we are initializing i in above code. So no need to specify the "i" here.
      for (; i <= pageLimit; i++) {
        this.pages.push(i);
      }
    }
  }
  /**
   * check which is last divisible number of 3
   */
  checkLastDividableNotThree() {
    const val = this.numberOfPages % this.noOfPagesToShow === 0 ? this.noOfPagesToShow : this.numberOfPages % this.noOfPagesToShow;
    return (this.numberOfPages - (val)) + 1;
  }
  /**
   *
   * @param pageNumber select page numbers
   */

  changePage(pageNumber: number) {
    this.goingReverse = false;
    if (pageNumber === 1) {
      this.gotoSelectedPage(pageNumber);
    } else if (pageNumber === this.numberOfPages) {
      this.gotoSelectedPage(pageNumber);
    } else if (this.currentPage < pageNumber) {
      if (pageNumber % this.noOfPagesToShow === 1) {
        this.gotoSelectedPage(pageNumber);
      }
    } else {
      this.goingReverse = true;
      if (pageNumber % this.noOfPagesToShow === 0) {
        this.gotoSelectedPage(pageNumber);
      }
    }
    this.currentPage = pageNumber;
    this.getData(pageNumber, this.defaultSelectValue);
  }
  /**
   * GOTO selected page
   * @param pageNumber select page numbers
   */
  gotoSelectedPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.generatePaginationNumber();
  }
  /**
   * Below function is used to get data from backend or array of object.
   * @param pageNumber
   * @param limit
   */

  getData(pageNumber: number, limit: number) {
    this.startPoint = (pageNumber - 1) * limit;
    // Below condition will get executed when there are more records than start point for the pagination
    this.emitStartAndLimit();
  }

  /**
   * Below function is used to emit the start point of chunk of data and count of records page need
   */

  emitStartAndLimit() {
    if (this.totalRecords > this.startPoint) {
      this.itemsStartAndLimit.emit({ startPoint: this.startPoint, pageLimit: this.startPoint + this.defaultSelectValue });
    }
  }

}
