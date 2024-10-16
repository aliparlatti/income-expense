import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonButton, IonIcon } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@ngneat/transloco';
import  moment from 'moment';

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  standalone: true,
  imports: [IonButton, IonIcon, TranslocoPipe],
  styles: [`
    .toggle-button {
      --border-radius: 0;
    }
  `]
})
export class DateRangeSelectorComponent implements OnInit {
  @Output() dateRangeChanged = new EventEmitter<{ startDate: string, endDate: string }>();

  filterForm: FormGroup;
  dateSelector: string = 'month';
  today = moment();

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [],
      endDate: []
    });
  }

  ngOnInit() {
    this.updateDateRange();
    this.filterForm.valueChanges.subscribe(() => {
      this.emitDateRange();
    });
  }

  updateDateRange() {
    let start: moment.Moment;
    let end: moment.Moment;

    switch (this.dateSelector) {
      case 'day':
        start = this.today.clone().endOf('day')
        end = start.clone().add(1,'days').endOf('day')
        break;
      case 'week':
        start = this.today.clone().startOf('week');
        end = start.clone().add(6, 'days');
        break;
      case 'month':
        start = this.today.clone().startOf('month');
        end = start.clone().endOf('month');
        break;
      case 'year':
        start = this.today.clone().startOf('year');
        end = start.clone().endOf('year');
        break;
    }

    this.filterForm.patchValue({
      startDate: start.format('YYYY-MM-DD HH:mm:ss'),
      endDate: end.format('YYYY-MM-DD HH:mm:ss')
    });
  }

  emitDateRange() {
    const startDate = this.filterForm.get('startDate')?.value;
    const endDate = this.filterForm.get('endDate')?.value;
    this.dateRangeChanged.emit({ startDate, endDate });
  }

  previousRange() {
    const currentStartDate = moment(this.filterForm.get('startDate')?.value);
    let newStartDate: moment.Moment;
    let newEndDate: moment.Moment;

    switch (this.dateSelector) {
      case 'day':
        newStartDate = currentStartDate.clone().subtract(1, 'day').endOf('day');
        newEndDate = currentStartDate.clone().endOf('day');
        break;
      case 'week':
        newStartDate = currentStartDate.subtract(1, 'week');
        newEndDate = newStartDate.clone().add(6, 'days');
        break;
      case 'month':
        newStartDate = currentStartDate.subtract(1, 'month').startOf('month');
        newEndDate = newStartDate.clone().endOf('month');
        break;
      case 'year':
        newStartDate = currentStartDate.subtract(1, 'year').startOf('year');
        newEndDate = newStartDate.clone().endOf('year');
        break;
    }

    this.filterForm.patchValue({
      startDate: newStartDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: newEndDate.format('YYYY-MM-DD HH:mm:ss')
    });
  }

  nextRange() {
    const currentStartDate = moment(this.filterForm.get('startDate')?.value);
    let newStartDate: moment.Moment;
    let newEndDate: moment.Moment;

    switch (this.dateSelector) {
      case 'day':
        newStartDate = currentStartDate.clone().add(1, 'day').endOf('day');
        newEndDate = newStartDate.clone().add(1, 'day').endOf('day');
        break;
      case 'week':
        newStartDate = currentStartDate.add(1, 'week');
        newEndDate = newStartDate.clone().add(6, 'days');
        break;
      case 'month':
        newStartDate = currentStartDate.add(1, 'month').startOf('month');
        newEndDate = newStartDate.clone().endOf('month');
        break;
      case 'year':
        newStartDate = currentStartDate.add(1, 'year').startOf('year');
        newEndDate = newStartDate.clone().endOf('year');
        break;
    }

    this.filterForm.patchValue({
      startDate: newStartDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: newEndDate.format('YYYY-MM-DD HH:mm:ss')
    });
  }

  protected readonly moment = moment;
}
