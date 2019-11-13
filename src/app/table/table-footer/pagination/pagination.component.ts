import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  @Input() totalCount: number;
  @Output() itemsToShow = new EventEmitter();
  @Input() defultRowValue: number;
  arrOfPages = [];
  currentPage = 1;
  nummberOfPages: number;
  startPoint: number;
  populateData = [];
  rowData = [
    { id: 1, rowValue: 1 },
    { id: 2, rowValue: 2 },
    { id: 3, rowValue: 3 },
    { id: 4, rowValue: 4 }
  ];

  constructor() { }

  ngOnInit() {
    this.generatePages();
    this.clickPageNumbers(1);
    this.defultRowValue = this.defultRowValue;
  }

  /**
   * Below function is used to generate pages.
   */
  generatePages() {
    // Total count / dropdown value.
    this.arrOfPages = [];
    this.nummberOfPages = Math.ceil(this.totalCount / this.defultRowValue);
    for (let i = 1; i <= this.nummberOfPages; i++) {
      this.arrOfPages.push(i);
    }
    this.emitStartAndLimit();
  }

  /**
   *
   * @param pageNumber select page numbers
   */

  clickPageNumbers(pageNumber: number) {
    this.currentPage = pageNumber;
    this.getData(pageNumber, this.defultRowValue);
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
      this.itemsToShow.emit({ startPoint: this.startPoint, pagelimit: this.startPoint + this.defultRowValue });
    }
  }

}
