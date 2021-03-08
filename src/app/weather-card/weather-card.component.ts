import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILocation } from '../interfaces/location.interface';
import { IWeatherData } from '../interfaces/weather-data.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() location!: ILocation;
  @Output() removeLocation: EventEmitter<ILocation> = new EventEmitter<ILocation>();
  weatherData!: IWeatherData;
  loading: boolean = false;
  noResults!: boolean;
  apiError!: boolean;
  private subscription!: Subscription;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  remove() {
    this.removeLocation.emit(this.location);
  }

  getLink() {
    let link = `forecast/${this.location.zipcode}`;
    // Only add country when it is needed
    if (this.location.countryCode !== environment.WEATHER.DEFAULT_COUNTRY_CODE) {
      link = `${link}/${this.location.countryCode}`;
    }
    return link;
  }

  getWeather() {
    this.loading = true;
    this.subscription = this.weatherService.getWeather(this.location)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        map((data: IWeatherData) => {
          data.condition = data.weather[0]?.main;
          data.description = data.weather[0]?.description;
          data.iconUrl = this.weatherService.getIcon(data.weather[0]?.icon);
          return data;
        })
      )
      .subscribe((data: IWeatherData) => {
        this.weatherData = data;
      }, error => {
        if (error.status !== 404) {
          this.apiError = true;
        }
        this.noResults = true;
      });
  }

}
