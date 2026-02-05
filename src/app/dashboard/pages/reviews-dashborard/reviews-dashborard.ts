import { Component } from '@angular/core';
import { ReviewsComponent } from './components/reviews.component/reviews.component';

@Component({
  selector: 'app-reviews-dashborard',
  imports: [ReviewsComponent],
  templateUrl: './reviews-dashborard.html',
  styleUrl: './reviews-dashborard.scss',
})
export class ReviewsDashborard {}
