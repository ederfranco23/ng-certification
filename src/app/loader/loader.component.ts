import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loader',
  template: '<span class="fas fa-circle-notch fa-spin fa-fw"></span>'
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
