import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { TabledataService } from "./service/tabledata.service";
import { TableComponent } from "./table/table.component";
import { PaginationComponent } from "./table/table-footer/pagination/pagination.component";
import { TableFooterComponent } from "./table/table-footer/table-footer.component";
import { SearchComponent } from "./table/table-filters/search/search.component";
import { DisplayDensityComponent } from './table/table-footer/display-density/display-density.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    PaginationComponent,
    TableFooterComponent,
    SearchComponent,
    DisplayDensityComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [HttpClientModule, TabledataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
