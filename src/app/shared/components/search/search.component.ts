import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() sendDataToParent: EventEmitter<string> = new EventEmitter();

  public searchProduct: any;
  constructor(){
    this.sendDataToParent.emit(this.searchProduct);
  }
}
