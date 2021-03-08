import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/location.interface';
import { IForecastData, IWeatherData } from '../interfaces/weather-data.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit, OnDestroy {

  forecastData!: IForecastData;
  location!: ILocation;
  loading: boolean = false;
  noResults!: boolean;
  apiError!: boolean;
  private subscription!: Subscription;

  constructor(private weatherService: WeatherService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      data => {
        this.location = Object.assign({} as ILocation, data);
        if(this.location.countryCode === undefined) {
          this.location.countryCode = environment.WEATHER.DEFAULT_COUNTRY_CODE
        }
        this.getForecast();
      }
    )
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  getForecast() {
    this.loading = true;
    this.subscription = this.weatherService.getForecast(this.location)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data: IForecastData) => {
          data.list.map((item: IWeatherData) => {
            item.condition = item.weather[0]?.main;
            item.description = item.weather[0]?.description;
            item.iconUrl = this.weatherService.getIcon(item.weather[0]?.icon);
            item.weekDay = new Date(item.dt * 1000).toLocaleDateString("en-US", { month: "short", weekday: "long", day: "2-digit" });
          });
          return data;
        })
      )
      .subscribe((data: IForecastData) => {
        this.forecastData = data;
        console.log(this.forecastData);
      }, error => {
        if(error.status !== 404) {
          this.apiError = true;
        }
        this.noResults = true;
      });
  }
}
