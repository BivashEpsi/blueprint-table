import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-display-density',
  templateUrl: './display-density.component.html',
  styleUrls: ['./display-density.component.scss']
})
export class DisplayDensityComponent implements OnInit {

  @Output()
  displayDensityEmitter = new EventEmitter();

  @Input()
  showDisplayDensity: boolean;

  displayDensity = 'Comfortable';
  displayDensityOptions = [
    { id: 1, selectedValue: 'Comfortable' },
    { id: 2, selectedValue: 'Compact' }
  ];

  constructor() { }

  ngOnInit() {
    this.displayDensity = ( !localStorage.getItem('selectedView') ) ? this.displayDensity : localStorage.getItem('selectedView');
  }

  setDisplayDensity(selectedDensity) {
    this.displayDensityEmitter.emit( selectedDensity );
  }

}