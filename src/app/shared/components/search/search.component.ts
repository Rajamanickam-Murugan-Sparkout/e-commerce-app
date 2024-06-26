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
  @Output() sendData: EventEmitter<string> = new EventEmitter();

  searchProduct: string = '';
  constructor(){
  }

  /**
   * Retrieve a search input value and send it to the home component (parent).
   * @param event 
   */
  onSearchInputChange(event: any){
    this.sendData.emit(event)
  }

}
