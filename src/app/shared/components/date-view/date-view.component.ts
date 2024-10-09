import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-view',
  standalone: true,
  templateUrl: './date-view.component.html'
})
export class DateViewComponent implements OnInit {
  @Input() date: Date;

  day: number;
  month: string;
  year: number;
  dayName: string;

  ngOnInit(): void {
    this.day = this.date.getDate();
    this.month = (this.date.getMonth() + 1).toString().padStart(2, '0');
    this.year = this.date.getFullYear();
    this.dayName = this.date.toLocaleDateString('tr-TR', { weekday: 'long' });
  }
}
