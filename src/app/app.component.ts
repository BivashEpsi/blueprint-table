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

  columnValue = [
    { key: "date", value: "Date" },
    { key: "amount", value: "Amount" },
    { key: "phone", value: "Phone" },
    { key: "description", value: "Description" }
  ];

  constructor(private tableDataService: TabledataService) {}

  ngOnInit() {
    this.loadService = this.tableDataService.get_cuData().subscribe(res => {
      console.log(res);
      this.data = res.body.customerData.data;
      this.isDataLoading = false;
    });
  }

  ngOnDestroy() {
    this.loadService.unsubscribe();
  }
}
