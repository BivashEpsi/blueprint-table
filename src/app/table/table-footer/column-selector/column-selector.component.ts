import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
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
export class ColumnSelectorComponent implements AfterViewChecked {
  @Input() dropdownOptions = [];
  @Input() defaultSortColName: string;
  @Input() showColumnSelector = false;

  private selectedColumns = [];

  @ViewChild('columnSelectorDropdown', {static: false}) columnSelectorDropdown: NgSelectComponent;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.setColumnSelectedCount();
    this.columnSelectorDropdown.writeValue(`Showing ${this.selectedColumns.length} out of ${this.dropdownOptions.length}`);
    this.cdr.detectChanges();
  }

  onColumnChecked($event, option) {
    option.isColumnDisplayed = $event.target.checked ? true : false;
    this.setColumnSelectedCount();
  }

  setColumnSelectedCount() {
    if (Array.isArray(this.dropdownOptions) && this.dropdownOptions.length) {
      this.selectedColumns = this.dropdownOptions.filter((column) => {
        return column.isColumnDisplayed === true;
      });
    }
  }
}
