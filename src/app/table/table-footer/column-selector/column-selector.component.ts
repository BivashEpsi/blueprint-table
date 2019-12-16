import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
  AfterViewChecked,
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-column-selector',
  templateUrl: './column-selector.component.html',
  styleUrls: ['./column-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColumnSelectorComponent implements AfterViewChecked, OnDestroy {
  @Input() options = [];
  @Input() defaultSortColName: string;
  @Input() showColumnSelector = false;
  @Output() selectChange = new EventEmitter();

  private columnSelectedCount: any[];

  @ViewChild('columnSelectorDropdown', {static: false}) columnSelectorDropdown: NgSelectComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.getColumnSelectedCount();
    this.columnSelectorDropdown.writeValue(`Showing ${this.columnSelectedCount.length} out of ${this.options.length}`);
    this.cdr.detectChanges();
  }

  onColumnChecked($event, option) {
    option.checked = $event.target.checked ? true : false;
    this.getColumnSelectedCount();
  }

  getColumnSelectedCount() {
    if (Array.isArray(this.options) && this.options.length) {
      this.columnSelectedCount = this.options.filter((column) => {
        return column.checked === true;
      });
    }
  }

  ngOnDestroy() {}
}
