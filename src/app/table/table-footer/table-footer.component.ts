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
  pageBuffer: number;

  @Input()
  pageNumber: number;

  @Output()
  pageData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitPageData(event) {
    this.pageData.emit(event);
  }
}
