import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {CategoryService} from "../../../shared/services/category.service";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Category} from "../../../shared/models/category.model";
import {IonButton, IonIcon, IonItem, IonList, IonSelect, IonSelectOption} from "@ionic/angular/standalone";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {addIcons} from "ionicons";
import * as icon from "ionicons/icons";

@Component({
  selector: 'app-add-income',
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
    NgIf
  ],
  templateUrl: './add-income.component.html',
  styles: ``
})
export class AddIncomeComponent implements OnInit, OnDestroy {
  _unsubscribeAll: Subject<any> = new Subject<any>()
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([])
  selectedCategory: Category;

  constructor(private categoryService: CategoryService) {
    addIcons({...icon})
  }

  ngOnInit() {
    this.categoryService.getCategories().pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      this.categories$.next(value.map(v => new Category(v)))
    })
  }

  ngOnDestroy() {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete()
  }

  changeCategory(event: any) {
    this.selectedCategory = event.detail.value
  }
}
