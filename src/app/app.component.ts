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

  columnInfo = [
    { key: "date", displayName: "Date", checked: true },
    { key: "amount", displayName: "Amount", checked: true },
    { key: "phone", displayName: "Phone", checked: true },
    { key: "description", displayName: "Description", checked: true }
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
