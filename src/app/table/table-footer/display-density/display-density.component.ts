import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-display-density',
  templateUrl: './display-density.component.html',
  styleUrls: ['./display-density.component.scss']
})
export class DisplayDensityComponent implements OnInit {

  @Output()
  displayDensityEmitter = new EventEmitter();

  displayDensity = 'Comfortable';
  displayDensityOptions = [
    { id: 1, selectedValue: 'Comfortable' },
    { id: 2, selectedValue: 'Compact' }
  ];

  constructor() { }

  ngOnInit() {
  }

  setDisplayDensity(event: { target: { value: any; }; }) {
    this.displayDensityEmitter.emit(event);
  }

}
