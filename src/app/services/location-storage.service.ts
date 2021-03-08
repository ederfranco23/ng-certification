import { Injectable } from '@angular/core';
import { ILocation } from '../interfaces/location.interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LocationStorageService extends LocalStorageService {

  private readonly STORED_LOCATIONS = 'STORED_LOCATIONS';
  private locations!: ILocation[];

  constructor() {
    super();
  }

  getList(): ILocation[] {
    const fromStorage = this.get(this.STORED_LOCATIONS);
    this.locations = (fromStorage) ? fromStorage : [];
    return this.locations;
  }

  exists(location: ILocation): boolean {
    const found = this.locations.filter((item: ILocation) => {
      return (item.zipcode === location.zipcode && item.countryCode === location.countryCode)
    });
    return found.length > 0;
  }

  add(location: ILocation): ILocation[] {
    this.locations.push(location);
    this.save(this.STORED_LOCATIONS, this.locations);
    return this.locations;
  }

  delete(location: ILocation): ILocation[] {
    const index = this.locations.indexOf(location);
    if (index >= 0) {
      this.locations.splice(index, 1);
      this.save(this.STORED_LOCATIONS, this.locations);
    }
    return this.locations;
  }

}
