import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  @Input() totalCount: number;
  @Output() itemsStartAndLimit = new EventEmitter();
  @Input() defaultRowValue: number;
  @Input() columnHeadersData: number;
  arrOfPages = [];
  currentPage = 1;
  numberOfPages: number;
  startPoint: number;
  rowData = [
    { id: 1, rowValue: 10 },
    { id: 2, rowValue: 25 },
    { id: 3, rowValue: 50 },
    { id: 4, rowValue: 100 }
  ];

  constructor() { }

  ngOnInit() {
    this.setRowLimit();
    this.changePage(1);
    this.defaultRowValue = this.defaultRowValue;
  }

  /**
   * Below function is used to generate pages.
   */
  setRowLimit() {
    // Total count / dropdown value.
    this.arrOfPages = [];
    let lastPageFlag = false;
    if (this.currentPage === this.numberOfPages) {
      lastPageFlag = true;
    }
    this.numberOfPages = Math.ceil(this.totalCount / this.defaultRowValue);
    for (let i = 1; i <= this.numberOfPages; i++) {
      this.arrOfPages.push(i);
    }
    if (lastPageFlag && this.currentPage > this.numberOfPages) {
      this.changePage(this.numberOfPages);
    } else {
      this.emitStartAndLimit();
    }
  }

  /**
   *
   * @param pageNumber select page numbers
   */

  changePage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getData(pageNumber, this.defaultRowValue);
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
   * Below function is used to emit the start point of chunck of data and count of records page need
   */
  emitStartAndLimit() {
    if (this.totalCount > this.startPoint) {
      this.itemsStartAndLimit.emit({ startPoint: this.startPoint, pagelimit: this.startPoint + this.defaultRowValue });
    }
  }

}
