import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-footer',
  templateUrl: './table-footer.component.html',
  styleUrls: ['./table-footer.component.scss']
})
export class TableFooterComponent implements OnInit {

  @Input()
  totalRecords: number;

  @Input()
  defaultNumberOfRows: number;

  @Input()
  tableDataStartIndex: number;

  @Input()
  showCurrentPage: number;

  @Input()
  paginationListToShow: number;

  @Output()
  getPageCount = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  getCurrentPageCount(event: number) {
    this.getPageCount.emit(event);
  }
}
