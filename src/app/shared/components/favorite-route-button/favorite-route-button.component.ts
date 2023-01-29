import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-favorite-route-button',
  templateUrl: './favorite-route-button.component.html',
  styleUrls: ['./favorite-route-button.component.css'],
})
export class FavoriteRouteButtonComponent implements OnInit, OnChanges {
  selected: boolean = false;

  @Input() isFavorite: boolean = false;

  @Output() changeFavoriteEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const isFavoriteChange = changes['isFavorite'];
    if (isFavoriteChange) {
      const isFavorite = isFavoriteChange.currentValue;
      this.selected = isFavorite;
    }
  }

  toggleSelected() {
    this.selected = !this.selected;
    this.changeFavoriteEvent.emit(this.selected);
  }
}
