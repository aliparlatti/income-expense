import {Injectable} from '@angular/core';
import {SupabaseService} from "./supabase.service";
import {from, Observable} from "rxjs";
import {Category} from "../models/category.model";


@Injectable({
  providedIn: 'root',
})
export class CategoryService extends SupabaseService {
  constructor() {
    super()
  }

  getCategories(): Observable<Category[]> {
    return from(this.getTableData('categories'));
  }
}
