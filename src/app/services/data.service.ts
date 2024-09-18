import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../models';
import { catchError, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  URL = '/assets/data.json';

  constructor(private http: HttpClient) {}

  getData(): Observable<Data> {
    return this.http.get<Data>(this.URL).pipe(
      retry(3),
      catchError((error) => {
        console.error('Error fetching data:', error);
        return [];
      })
    );
  }
}
