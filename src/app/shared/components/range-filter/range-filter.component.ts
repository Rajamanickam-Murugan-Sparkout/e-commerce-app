import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-range-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './range-filter.component.html',
  styleUrls: ['./range-filter.component.css']
})
export class RangeFilterComponent {
  @Output() sendRangeValue: EventEmitter<string> = new EventEmitter();


  onRangeInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    // console.log('Current value:', value);
    this.sendRangeValue.emit(value);
    // You can use `value` here to react to the range input value change
  }
}
