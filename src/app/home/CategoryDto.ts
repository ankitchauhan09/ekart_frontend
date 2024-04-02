export class CategoryDto{
  categoryId:number;
  categoryName:string;
  constructor(categoryId : number, categoryName : string) {
    this.categoryName = categoryName;
    this.categoryId = categoryId;
  }

}
