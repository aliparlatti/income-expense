import {Component} from '@angular/core';
import {
  IonButton,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonRouterLink,
  IonRow, IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";
import {ActivatedRoute, NavigationExtras, Router, RouterLink, RouterOutlet} from "@angular/router";
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
import {TruncatePipe} from "../../pipes/truncate.pipe";

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
    DateViewComponent,
    IonItemSliding,
    IonItemOption,
    IonItemOptions,
    TruncatePipe,
    IonSpinner
  ],
  templateUrl: './transaction-list.component.html',
  styles: `
    :host ion-item {
      --inner-padding-end: 6px;
      --padding-start: 6px
    }
  `
})
export class TransactionListComponent {
  isIncome: boolean;
  _unsubscribeAll: Subject<any> = new Subject<any>()
  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([])
  currentPage = 1;

  constructor(private transactionService: TransactionService, private activatedRoute: ActivatedRoute,private router:Router) {
    addIcons({...icon})
    this.activatedRoute.data.subscribe(data => {
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

  deleteTransaction(transaction: Transaction) {
    this.transactionService.deleteTransaction({id: transaction.id}).pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      const t=this.transactions$.value?.filter(v=> v.id !== transaction.id)
      this.transactions$.next(t)
    })
  }

  editTransaction(transaction: Transaction) {
    const navigationExtras: NavigationExtras = {
      state: {
        transaction: transaction
      }
    };
    this.router.navigate([this.isIncome ?'tabs/incomes/add':'tabs/expenses/add'], navigationExtras);  }
}
