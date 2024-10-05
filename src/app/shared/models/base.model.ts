export class BaseModel {
  created: Date;
  updated: Date;

  constructor(obj?: any) {
    this.bind(obj);
  }

  bind(obj: any) {
    this.created = obj?.created ? obj.created : new Date();
    this.updated = obj?.updated ? obj.updated : new Date();
  }
}
