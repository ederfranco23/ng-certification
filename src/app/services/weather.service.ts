import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/location.interface';
import { IWeather } from '../interfaces/weather.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private serverUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `${environment.WEATHER.API_URL}&appId=${environment.WEATHER.API_KEY}`;
  }

  getWeather(location: ILocation) {
    return this.httpClient.get<IWeather>(`${this.serverUrl}&zip=${location.zipcode},${location.countryCode}`);
  }
}
