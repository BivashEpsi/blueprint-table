import { Component, Input, Output, OnInit, EventEmitter } from "@angular/core";

@Component({
  selector: "bp-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  // Placeholder Text
  @Input()
  placeholder = "Search";

  // Is the search is in progress?
  @Input()
  isSearching = false;

  // Label for search field
  @Input()
  label = "Search";

  // Emit the search query string
  @Output()
  search = new EventEmitter<string>();

  // Emit when search is cleared
  @Output()
  clearSearch = new EventEmitter();

  public searchFilter = "";
  public showClearIcon = false;

  constructor() { }

  ngOnInit() { }

  onClearSearch() {
    this.searchFilter = "";
    this.showClearIcon = false;
    this.clearSearch.emit();
  }

  onSearch() {
    if (this.searchFilter.length > 0) {
      this.search.emit(this.searchFilter);
    }
  }

  inputController(event) {
    if (event.key === "Enter" && this.searchFilter.length > 0) {
      this.showClearIcon = true;
      this.search.emit(this.searchFilter);
    } else if (
      (event.key === "Backspace" || event.key === "Delete") &&
      this.searchFilter.length === 0
    ) {
      this.showClearIcon = false;
      this.clearSearch.emit();
    } else if (this.searchFilter.length > 0) {
      this.showClearIcon = true;
    } else {
      this.showClearIcon = false;
    }
  }
}
