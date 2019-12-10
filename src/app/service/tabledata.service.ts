import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TabledataService {
  url = 'http://localhost:3000';
  constructor(private https: HttpClient) { }

  get_cuData(): Observable<HttpResponse<any>> {
    return this.https.get<HttpResponse<any>>(this.url + '/customerData', { observe: 'response' })
  }

}
