import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})


// This component only handles the actual pagination part of the table,
// the actual rows and rendering is handled by the table component
export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  totalRecords: number;

  @Input()
  defaultNumberOfRows: number;

  @Input()
  pageBuffer = 1;

  @Input()
  pageNumber: number;
  
  @Output()
  pageData = new EventEmitter();
  
  totalPages: number;
  currentPage = 1;
  pageButtons = [];
  
  numberOfRows = 10;
  numberOfRowsOptions = [10, 25, 50, 100];

  constructor() { }

  ngOnInit() {
    this.numberOfRows = this.defaultNumberOfRows;
    this.paginate(1);
  }

  ngOnChanges(changes) { 
    // Select the first page when the data changes
    if (changes.totalRecords && !changes.totalRecords.firstChange) {
      this.paginate(1);
    }

    // Handles when page needs to eb changed from parent component
    if (changes.pageNumber && changes.pageNumber.currentValue && changes.pageNumber.currentValue !== this.currentPage) {
      this.paginate(changes.pageNumber.currentValue);
    }
  }

  paginate(page: number) {
    this.totalPages = this.getTotalPages();
    this.changePage(page);
  }

  isStepperDisabled(selectedPage: number): boolean {
    return this.currentPage === selectedPage ? true : false;
  }

  // Determines the numbers to show in pagination
  changePage(page: number): void {
    this.currentPage = page;
    this.pageButtons = [];

    if (this.currentPage - this.pageBuffer <= 1) {
      for (let i = 1; this.pageButtons.length <= this.pageBuffer * 2 && i <= this.totalPages; i++) {
        this.pageButtons.push(i);
      }
    } else if (this.currentPage + this.pageBuffer >= this.totalPages) {
      for (let i = this.totalPages; this.pageButtons.length <= this.pageBuffer * 2 && i >= 1; i--) {
        this.pageButtons.push(i);
      }
      this.pageButtons.reverse();
    } else {
      for (let i = this.currentPage - this.pageBuffer; this.pageButtons.length <= this.pageBuffer * 2 && i <= this.totalPages; i++) {
        this.pageButtons.push(i);
      }
    }

    // Sends the current page and number of rows back to table to let the table handle determining the rows
    this.pageData.emit({
      currentPage: this.currentPage,
      numberOfRows: this.numberOfRows,
    });
  }

  getTotalPages() {
    return Math.floor(this.totalRecords / this.numberOfRows) + 1;
  }

}
