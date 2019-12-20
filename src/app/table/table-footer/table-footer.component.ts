import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Column } from 'src/app/model/column';

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

  @Input()
  showColumnSelector = false;

  @Input()
  columnInfo: Column[];

  @Input()
  defaultSortColName: string;

  @Output()
  pageData = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  emitPageData(event) {
    this.pageData.emit(event);
  }
}
