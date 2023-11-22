import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatiscisService {

  constructor(private http: HttpClient) { }


  getStatistics(filter: any): Observable<any> {
    return this.http.get<any>(`http://localhost:4000/api/statistic`, { params: { ...filter } })
  }
}
