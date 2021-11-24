import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
const headers = new HttpHeaders()
  .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  .set('Access-Control-Allow-Origin', '*');
@Injectable({
  providedIn: 'root'
})
export class AddressServiceService {
  private url = environment.baseURL;
  constructor(private httpClient: HttpClient) { }


  getCountry() {
    return this.httpClient.get(this.url + 'countries.json', { headers });
  }

  getState() {
    return this.httpClient.get(this.url + 'states.json', { headers });
  }

  getCity() {
    return this.httpClient.get(this.url + 'cities.json', { headers });
  }
}
