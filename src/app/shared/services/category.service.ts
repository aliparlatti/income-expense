import {Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {from, Observable} from "rxjs";
import {Category} from "../models/category.model";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root',
})
export class CategoryService extends SupabaseService {
  constructor() {
    super()
  }

  getCategories(): Observable<Category[]> {
    return from(this.getTableData('categories')).pipe(
      map(categories => categories.map(category => new Category(category))) // Convert each item to Category
    );
  }
}
