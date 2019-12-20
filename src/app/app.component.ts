import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabledataService } from "./service/tabledata.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'table';
  data = [];
  loadService: any;
  isDataLoading = true;
  showDisplayDensity = true;

  columnInfo = [
    { key: "date", displayName: "Date" },
    { key: "amount", displayName: "Amount" },
    { key: "phone", displayName: "Phone" },
    { key: "description", displayName: "Description" }
  ];

  constructor(private tableDataService: TabledataService) {}

  ngOnInit() {
    this.loadService = this.tableDataService.get_cuData().subscribe(res => {
      this.data = res.body.customerData.data;
      this.isDataLoading = false;
    });
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
