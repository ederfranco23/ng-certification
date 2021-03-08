import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() location!: ILocation;
  @Output() removeLocation: EventEmitter<ILocation> = new EventEmitter<ILocation>();

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  remove() {
    this.removeLocation.emit(this.location);
  }

}
