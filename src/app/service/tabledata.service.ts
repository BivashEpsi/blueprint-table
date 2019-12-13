import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TabledataService {
  url = 'https://raw.githubusercontent.com/epsilon-ux/blueprint-table/master/tableData.json';
  constructor(private https: HttpClient) { }

  get_cuData(): Observable<HttpResponse<any>> {
    return this.https.get<HttpResponse<any>>(this.url, { observe: 'response' });
  }

}
