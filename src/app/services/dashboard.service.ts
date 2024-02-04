import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';

const API_URL = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

constructor(private http: HttpClient) {}

public createApi(payloads:any , param:any): Observable<any> {
  if(param){
    return this.http.put(API_URL + '/listCreate' + param , payloads).pipe(map(res => res));
  } else {
    return this.http.post(API_URL + '/listCreate' , payloads).pipe(map(res => res));
  }
}

public listApi(): Observable<any> {
  return this.http.get(API_URL +'/listCreate').pipe(map(res => res));
}

public listSingle(param:any): Observable<any> {
  return this.http.get(API_URL +'/listCreate' + param).pipe(map(res => res));
}

 public listUpdate(params:any): Observable<any> {
 return this.http.put(API_URL + '/listCreate' , params).pipe(map(res => res));
 }

 public listDelete(params:any): Observable<any> {
 return this.http.delete(API_URL + '/listCreate' + params ).pipe(map(res => res));
 }



}
