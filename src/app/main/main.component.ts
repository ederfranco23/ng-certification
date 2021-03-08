import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ICountry } from '../interfaces/country.interface';
import { CountryService } from '../services/country.service';
import { finalize } from 'rxjs/operators';
import { ILocation } from '../interfaces/location.interface';
import { LocationStorageService } from '../services/location-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  locationForm!: FormGroup;
  locations!: ILocation[];
  countries!: ICountry[];
  exists: boolean = false;
  ZIPCODE_SEARCH_URL!: string;
  countriesLoading: boolean = false;
  private subscription!: Subscription;

  constructor(private formBuilder: FormBuilder,
    private storageService: LocationStorageService,
    private countryService: CountryService) {
    this.formInit();
  }

  ngOnInit(): void {
    this.locations = this.storageService.getList();
    this.ZIPCODE_SEARCH_URL = environment.WEATHER.ZIPCODE_SEARCH_URL;
    this.getCountries();
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  addLocation() {
    this.locationForm.get('zipcode')?.markAsDirty();
    this.locationForm.get('zipcode')?.markAsTouched();
    const values: ILocation = this.locationForm.value;
    this.exists = this.storageService.exists(values);
    if (this.locationForm.valid && !this.exists) {
      this.locations = this.storageService.add(values);
      this.locationForm.reset({
        countryCode: this.countryService.getDefault().alpha2Code
      });
    }
  }

  removeLocation(location: ILocation) {
    this.locations = this.storageService.delete(location);
  }

  private formInit() {
    this.locationForm = this.formBuilder.group({
      zipcode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      countryCode: new FormControl(this.countryService.getDefault().alpha2Code, [Validators.required])
    });
  }

  private getCountries() {
    this.countries = [] as Array<ICountry>;
    this.countriesLoading = true;
    this.locationForm.get(`countryCode`)?.disable();
    this.subscription = this.countryService.get().
      pipe(
        finalize(() => {
          this.countriesLoading = false;
          this.locationForm.get(`countryCode`)?.enable();
        })
      ).
      subscribe(data => {
        this.countries = data;
      }, () => {
        this.countries.push(this.countryService.getDefault())
      });
  }

}
