import { CommonModule } from '@angular/common';
import { Component ,Input, Output, signal ,computed, effect, EventEmitter} from '@angular/core';
import { property } from '../../Interfaces/property';


interface SearchQuery {
  query: string;
  type: string;
  status: string;
  minPrice: number|null;
  maxPrice: number|null;
  minNoRooms: number|null;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Input() set data(value: property[]|null) {
    this._data.set(value);
  }
  private _data = signal<property[]|null>(null);

  @Output() filteredData = new EventEmitter<property[]|null>();

  private searchQuery = signal<SearchQuery>({
    query: '',
    type: '',
    status: '',
    minPrice: null,
    maxPrice: null,
    minNoRooms: null
  });

  private _filteredData = computed<property[]|null>(() => {
    // console.log('Computing filtered data');

    const data = this._data();
    const query = this.searchQuery();
    if (!data) return null;
    return data.filter((property) => {
      if (query.query && !property.description?.includes(query.query)) return false;
      if (query.type && query.type !== 'any' && property.type !== query.type) return false;
      if (query.status && query.status !== 'any' && property.status !== query.status) return false;
      if (query.minPrice && (!property.price || property.price < query.minPrice)) return false;
      if (query.maxPrice && (!property.price || property.price > query.maxPrice)) return false;
      if (query.minNoRooms && (!property.numberOfRooms || property.numberOfRooms < query.minNoRooms)) return false;
      return true;
    });
  });

  constructor() {
    effect(() => {
      // console.log('Emitting filtered data');
      this.filteredData.emit(this._filteredData());
    });
  }
  activeDropdown: string = '';

  toggleDropdown(dropdown: string) {
    if (this.activeDropdown === dropdown) {
      this.activeDropdown = ''; // Close the dropdown if clicking the same one
    } else {
      this.activeDropdown = dropdown; // Open the clicked dropdown and close others
    }
  }
  onMaxPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const price = parseInt(target.value);
    this.searchQuery.set( {...this.searchQuery(), maxPrice: price});

  }
  onMinPriceChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const price = parseInt(target.value);
    this.searchQuery.set({...this.searchQuery(), minPrice: price});
  }
  onNORoomsChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const noRooms = parseInt(target.value);
    this.searchQuery.set({ ...this.searchQuery(), minNoRooms: noRooms });
  }
  onPropertyTypeChange(type: string) {
    this.searchQuery.set({ ...this.searchQuery(), type });
  }
  onBuyChange(status: string) {
    this.searchQuery.set({ ...this.searchQuery(), status });
  }
  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value;
    this.searchQuery.set({ ...this.searchQuery(), query });
  }

}
