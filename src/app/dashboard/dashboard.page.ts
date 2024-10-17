import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  IonButton,
  IonContent, IonDatetime,
  IonHeader, IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonModal, IonTabButton,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {TransactionPieChartComponent} from "./components/transaction-pie-chart/transaction-pie-chart.component";
import {TransactionService} from "../shared/services/transaction.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {TransactionTotalModel} from "../shared/models/transaction-total.model";
import {CurrencyFormatPipe} from "../shared/pipes/currency-format.pipe";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TranslocoPipe} from "@ngneat/transloco";
import {addIcons} from "ionicons";
import {filterCircleOutline, chevronBackOutline, chevronForwardOutline,pieChartOutline,statsChartSharp} from "ionicons/icons";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DateRangeSelectorComponent} from "../shared/components/date-range-selector/date-range-selector.component";
import moment from 'moment';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  standalone: true,
  styles: `
    .toggle-button {
      --border-radius: 0;
      --border-width: 1px;
    }
  `,
  imports: [AsyncPipe, IonContent, IonHeader, IonTitle, IonToolbar, TransactionPieChartComponent, IonList, IonLabel, IonItem, CurrencyFormatPipe, NgForOf, TranslocoPipe, IonModal, IonTabButton, IonIcon, IonButton, IonDatetime, DateRangeSelectorComponent, NgIf],
})
export class DashboardPage implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>()
  transactionTotalList$: BehaviorSubject<TransactionTotalModel[]> = new BehaviorSubject<TransactionTotalModel[]>([])
  transactionTotals$: BehaviorSubject<TransactionTotalModel[]> = new BehaviorSubject<TransactionTotalModel[]>([])
  filterForm: FormGroup;
  chartType$: BehaviorSubject<string> = new BehaviorSubject<string>('pie')
  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    addIcons({filterCircleOutline, chevronBackOutline, chevronForwardOutline,pieChartOutline,statsChartSharp})
    const today = moment().startOf('day');
    const oneMonthAgo = moment().subtract(1, 'month').startOf('day');

    this.filterForm = this.fb.group({
      isIncome: [true],
      startDate: [oneMonthAgo.format('YYYY-MM-DD HH:mm:ss')],
      endDate: [today.endOf('day').format('YYYY-MM-DD HH:mm:ss')]
    });
  }

  ionViewWillEnter() {
    this.loadData();
  }

  ngOnInit() {
    this.filterForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.loadData();
    });
  }

  onDateRangeChange(dateRange: { startDate: string, endDate: string }) {
    this.filterForm.patchValue({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate
    });
  }

  loadData() {
    const startDate = this.filterForm.get('startDate').value;
    const endDate = this.filterForm.get('endDate').value;
    const isIncome = this.filterForm.get('isIncome').value;

    this.transactionService.getCategoryTotal(startDate, endDate, isIncome).subscribe(value => {
      this.transactionTotalList$.next(value);
      this.transactionTotals$.next(value.slice(0, 5));
    });
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }
}
