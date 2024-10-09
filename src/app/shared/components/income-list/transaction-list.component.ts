import {Component} from '@angular/core';
import {
  IonButton, IonCol,
  IonContent, IonFab, IonFabButton, IonGrid,
  IonHeader,
  IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList,
  IonRouterLink, IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute, RouterLink, RouterOutlet} from "@angular/router";
import {addIcons} from "ionicons";
import * as icon from "ionicons/icons";
import {HeaderComponent} from "../header/header.component";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Transaction} from "../../models/transaction.model";
import {TransactionService} from "../../services/transaction.service";
import {AsyncPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {CurrencyFormatPipe} from "../../pipes/currency-format.pipe";
import {InfiniteScrollCustomEvent} from "@ionic/angular";
import {TranslocoPipe} from "@ngneat/transloco";
import {DateViewComponent} from "../date-view/date-view.component";

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterOutlet,
    IonButton,
    IonIcon,
    IonRouterLink,
    RouterLink,
    HeaderComponent,
    IonList,
    IonItem,
    IonLabel,
    DatePipe,
    AsyncPipe,
    NgForOf,
    NgIf,
    IonGrid,
    IonRow,
    IonCol,
    CurrencyFormatPipe,
    IonFab,
    IonFabButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    TranslocoPipe,
    DateViewComponent
  ],
  templateUrl: './transaction-list.component.html',
  styles: `
  `
})
export class TransactionListComponent {
  isIncome: boolean;
  _unsubscribeAll: Subject<any> = new Subject<any>()
  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([])
  currentPage = 1;

  constructor(private transactionService: TransactionService, private route: ActivatedRoute) {
    addIcons({...icon})
    this.route.data.subscribe(data => {
      this.isIncome = data['isIncome']
    });
  }

  ionViewWillEnter() {
    this.currentPage = 1;
    this.loadData()
  }

  loadData() {
    this.transactionService.getTransactions(this.isIncome, this.currentPage).pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      this.transactions$.next(value.map(v => new Transaction(v)))
    })
  }

  onIonInfinite(event: any) {
    this.currentPage++;
    this.transactionService.getTransactions(true, this.currentPage).subscribe(transactions => {
      const nT = transactions.map(v => new Transaction(v))
      this.transactions$.next([...this.transactions$.value, ...nT])
      setTimeout(() => {
        (event as InfiniteScrollCustomEvent).target.complete();
      }, 500);
      if (transactions.length === 0) {
        event.target.disabled = true;
      }
    });
  }
}
