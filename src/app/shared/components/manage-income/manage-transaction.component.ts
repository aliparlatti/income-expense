import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {CategoryService} from "../../services/category.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Category} from "../../models/category.model";
import {
  IonAccordion, IonAccordionGroup,
  IonButton, IonDatetime, IonDatetimeButton, IonFab, IonFabButton,
  IonIcon,
  IonInput,
  IonItem, IonLabel,
  IonList, IonModal,
  IonSelect,
  IonSelectOption,
  IonTextarea
} from "@ionic/angular/standalone";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {addIcons} from "ionicons";
import * as icon from "ionicons/icons";
import {TranslocoPipe} from "@ngneat/transloco";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CurrencyFormatPipe} from "../../pipes/currency-format.pipe";
import {AuthService} from "../../services/auth.service";
import {TransactionService} from "../../services/transaction.service";
import {ToastrService} from "../../services/toastr.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Transaction} from "../../models/transaction.model";

@Component({
  selector: 'app-manage-transaction',
  standalone: true,
  imports: [
    HeaderComponent,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    AsyncPipe,
    NgForOf,
    IonIcon,
    IonButton,
    NgIf,
    TranslocoPipe,
    IonInput,
    FormsModule,
    CurrencyFormatPipe,
    IonTextarea,
    IonFab,
    IonFabButton,
    ReactiveFormsModule,
    IonLabel,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonAccordion,
    IonAccordionGroup,
  ],
  templateUrl: './manage-transaction.component.html',
  styles: [`
    ion-datetime-button::part(native) {
      @apply text-white;
    }
    @media (prefers-color-scheme: dark) {
      ion-datetime-button::part(native) {
        @apply bg-neutral-600;
      }
    }
  `]
})
export class ManageTransactionComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>()
  isIncome: boolean;
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([])
  selectedCategory: Category;
  applyFormat: boolean = true;
  form: FormGroup;
  date: Date;
  transaction: Transaction

  constructor(private router: Router, private route: ActivatedRoute, private toastrService: ToastrService, private transactionService: TransactionService, private autService: AuthService, private categoryService: CategoryService, private fb: FormBuilder, private currencyFormatPipe: CurrencyFormatPipe) {
    addIcons({...icon})

    this.route.queryParams.pipe(takeUntil(this._unsubscribeAll)).subscribe(params => {
      this.route.data.pipe(takeUntil(this._unsubscribeAll)).subscribe(data => {
        this.isIncome = data['isIncome']
        if (this.router.getCurrentNavigation()?.extras?.state) {
          this.transaction = new Transaction((this.router.getCurrentNavigation().extras.state['transaction']));
        }
        this.initForm()
      });
    });
  }

  ngOnInit() {
    this.categoryService.getCategories().pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      this.categories$.next(value.map(v => new Category(v)))
    })

  }

  initForm() {
    this.form = this.fb.group({
      category_id: [null, Validators.required],
      amount: [this.transaction?.amount || null, [Validators.required, Validators.min(0)]],
      notes: [this.transaction?.notes || ''],
      transaction_date: [this.transaction?.transaction_date.toJSON() || new Date().toJSON()],
      is_income: [this.isIncome],
      user_id: [this.autService.user$.value?.id]
    });
    if (this.transaction?.id) {
      this.onBlur();
      this.form.controls['category_id'].patchValue(this.transaction.category.id)
      this.selectedCategory = this.transaction.category
    }
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete()
  }

  changeCategory(event: any) {
    this.selectedCategory = event.detail.value
    this.form.controls['category_id'].patchValue(this.selectedCategory.id)
  }

  onBlur() {
    this.applyFormat = true;
    const formattedValue = this.currencyFormatPipe.transform(this.form.controls['amount'].value, this.applyFormat);
    this.form.controls['amount'].patchValue(formattedValue, {emitEvent: false});
  }

  onFocus() {
    this.applyFormat = false;
    const rawValue = this.form.controls['amount'].value ? this.form.controls['amount'].value.replace(/[^\d,]/g, '') : '';
    const parts = rawValue.split(',');

    if (parts.length > 1) {
      this.form.controls['amount'].setValue(parts[0] + (parts[1].replace(/0+$/, '') || ''));
    } else {
      this.form.controls['amount'].setValue(parts[0]);
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = {...this.form.value};
      const rawValue = formData.amount ? formData.amount.replace(/[^\d,]/g, '') : '';
      const parts = rawValue.split(',');

      if (parts.length > 1) {
        formData.amount = parseFloat(parts[0] + (parts[1].replace(/0+$/, '') || ''));
      } else {
        formData.amount = parseFloat(parts[0]);
      }
      if (this.transaction?.id) {
        this.transactionService.updateTransaction(formData, this.transaction.id)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(value => {
            console.log(value)
            this.toastrService.showToast('successUpdated', null, ['z-50', '-my-12'])
          }, error => {
            console.error('Error adding transaction:', error);
          });
      } else {
        this.transactionService.addTransaction(formData)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(value => {
            this.form.reset();
            this.initForm();
            this.selectedCategory = null;
            this.toastrService.showToast('successAdded', null, ['z-50', '-my-12'])
          }, error => {
            console.error('Error adding transaction:', error);
          });
      }
    }
  }

}
