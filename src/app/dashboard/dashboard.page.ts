import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  IonButton,
  IonContent,
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
import {AsyncPipe, NgForOf} from "@angular/common";
import {TranslocoPipe} from "@ngneat/transloco";
import {addIcons} from "ionicons";
import {filterCircleOutline} from "ionicons/icons";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  standalone: true,
  styles: `
    .toggle-button {
      --border-radius: 0;
    }
  `,
  imports: [AsyncPipe, IonContent, IonHeader, IonTitle, IonToolbar, TransactionPieChartComponent, IonList, IonLabel, IonItem, CurrencyFormatPipe, NgForOf, TranslocoPipe, IonModal, IonTabButton, IonIcon, IonButton],
})
export class DashboardPage implements OnInit, OnDestroy{
  _unsubscribeAll: Subject<any> = new Subject<any>()
  transactionTotalList$: BehaviorSubject<TransactionTotalModel[]> = new BehaviorSubject<TransactionTotalModel[]>([])
  transactionTotals$: BehaviorSubject<TransactionTotalModel[]> = new BehaviorSubject<TransactionTotalModel[]>([])
  filterForm: FormGroup;

  constructor(private transactionService: TransactionService, private fb: FormBuilder) {
    addIcons({filterCircleOutline})
    this.filterForm = this.fb.group({
      isIncome: [true],
      startDate: [],
      enDate: []
    })
  }

  ionViewWillEnter() {
    this.loadData()
  }
 ngOnInit() {
   this.filterForm.valueChanges.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
     this.loadData()
   })
 }

  loadData() {
    this.transactionService.getCategoryTotal("2024-01-01", "2024-12-31", this.filterForm.get('isIncome').value).pipe().subscribe(value => {
      this.transactionTotalList$.next(value)
      this.transactionTotals$.next(value.slice(0, 5));
    });
  }
  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete()
  }
}
