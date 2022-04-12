import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-star-rating-component',
  templateUrl: './star-rating-component.component.html',
  styleUrls: ['./star-rating-component.component.scss']
})
export class StarRatingComponentComponent implements OnInit {

  _selectedRating = 0
  @Input()
  set selectedRating(value: number) {
    this._selectedRating = value
    this.setRating(value);
  }

  get selectedRating() {
    return this._selectedRating;
  }

  @Input() disabled = true;
  @Output() rateEmitter = new EventEmitter()

  stars = [
    {
      id: 1,
      icon: 'star',
      class: 'star-gray'
    },
    {
      id: 2,
      icon: 'star',
      class: 'star-gray'
    },
    {
      id: 3,
      icon: 'star',
      class: 'star-gray'
    },
    {
      id: 4,
      icon: 'star',
      class: 'star-gray'
    },
    {
      id: 5,
      icon: 'star',
      class: 'star-gray'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
    if(!this.disabled)
    this.setRating(this.selectedRating)
  }

  selectStar(value: number): void {
    if (!this.disabled) {
      this.setRating(value)
      this.selectedRating = value;
      this.rateEmitter.emit(value);
    }
  }

  setRating(value: number) {
    this.stars.filter((star) => {
      if (star.id <= value) {
        star.class = 'star-gold star';
      } else {
        star.class = 'star-gray star';
      }
      return star;
    });
  }
}
