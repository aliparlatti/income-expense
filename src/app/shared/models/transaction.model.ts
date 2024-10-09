import {Category} from "./category.model";

export class Transaction {
  id?: number;
  user_id: string;
  amount: number;
  category: Category;
  transaction_date: Date;
  is_income: boolean;
  notes?: string;
  images?: string[];

  constructor(obj?: any) {
    this.id = obj?.id;
    this.user_id = obj?.user_id;
    this.amount = obj?.amount;
    this.category = obj?.category ? new Category(obj?.category) : null;
    this.transaction_date = new Date(obj?.transaction_date);
    this.is_income = obj?.is_income;
    this.notes = obj?.notes;
    this.images = obj?.images
  }
}
