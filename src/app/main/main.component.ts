import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public locationForm!: FormGroup;
  public locations: String[] = [];
  public exists: boolean = false;
  private readonly STORED_LOCATIONS = 'STORED_LOCATIONS';

  constructor(private formBuilder: FormBuilder, private storageService: LocalStorageService) {
    this.formInit();
  }

  ngOnInit(): void {
    const fromStorage = this.storageService.get(this.STORED_LOCATIONS);
    this.locations = (fromStorage)? fromStorage : [];
  }

  public addLocation() {
    this.locationForm.get('zipcode')?.markAsDirty();
    this.locationForm.get('zipcode')?.markAsTouched();
    const zipcode = this.locationForm.get('zipcode')?.value;
    this.exists = this.locations.includes(zipcode);

    console.log(this.exists);

    if(this.locationForm.valid) {
      if(!this.exists) {
        this.locations.push(zipcode);
        this.storageService.save(this.STORED_LOCATIONS, this.locations);
      }
    }
  }

  private formInit() {
    this.locationForm = this.formBuilder.group({
      zipcode: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

}
