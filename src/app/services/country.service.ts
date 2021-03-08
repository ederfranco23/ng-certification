import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICountry } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get<ICountry[]>(environment.COUNTRY_API_URL)
  }

  getDefault() {
    return {
      name: `United States of America"`,
      alpha2Code: `us`
    };
  }
}
