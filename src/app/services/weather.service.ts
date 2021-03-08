import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/location.interface';
import { IWeatherData } from '../interfaces/weather-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private serverUrl: string;

  constructor(private httpClient: HttpClient) {
    this.serverUrl = `${environment.WEATHER.API_URL}`;
  }

  getWeather(location: ILocation) {
    const url = `${this.serverUrl}weather?zip=${location.zipcode},${location.countryCode}&appid=${environment.WEATHER.API_KEY}&units=${environment.WEATHER.DEFAULT_UNITS}`;
    return this.httpClient.get<IWeatherData>(url);
  }

  getIcon(iconCode: string) {
    const appIconUrl = environment.WEATHER.APP_ICON_URL;
    const baseIconUrl = environment.WEATHER.BASE_ICON_URL;
    const apiIconURL = `${baseIconUrl}${iconCode}.png`;
    let iconName = ``;
    // return apiIconURL;
    if (iconCode.indexOf('01') >= 0) {
      iconName = `sun`;
    } else if (iconCode.indexOf('02') >= 0 || iconCode.indexOf('03') >= 0 || iconCode.indexOf('04') >= 0) {
      iconName = `clouds`;
    } else if (iconCode.indexOf('09') >= 0 || iconCode.indexOf('10') >= 0) {
      iconName = `rain`;
    } else if (iconCode.indexOf('13') >= 0) {
      iconName = `snow`;
    } else if (iconCode.indexOf('11') >= 0) {
      return apiIconURL;
    } else if (iconCode.indexOf('50') >= 0) {
      return apiIconURL;
    } else {
      return apiIconURL;
    }
    return `${appIconUrl}${iconName}.png`;
  }
}
