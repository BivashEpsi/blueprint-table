import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, OnChanges {

  @Input()
  totalRecords: number;

  @Input()
  defaultNumberOfRows: number;

  @Input()
  pageBuffer = 1;
  
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
    this.paginate();
  }

  ngOnChanges(changes) { 
    if (changes.totalRecords && !changes.totalRecords.firstChange) {
      this.paginate();
    }
  }

  paginate() {
    this.totalPages = this.getTotalPages();
    this.changePage(1);
  }

  isStepperDisabled(selectedPage: number): boolean {
    return this.currentPage === selectedPage ? true : false;
  }

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

    this.pageData.emit({
      currentPage: this.currentPage,
      numberOfRows: this.numberOfRows,
    });
  }

  getTotalPages() {
    return Math.floor(this.totalRecords / this.numberOfRows) + 1;
  }

}
