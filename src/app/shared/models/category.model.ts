import {BaseModel} from "./base.model";

export class Category extends  BaseModel{
  id: string;
  name: string;
  icon: string;


  constructor(obj?:any) {
    super(obj)
    this.id=obj?.id;
    this.name= obj?.name;
    this.icon = obj.icon;
  }
}
