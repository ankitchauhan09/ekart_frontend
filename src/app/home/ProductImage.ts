import {SafeUrl} from "@angular/platform-browser";

export class ProductImage{

  imageList : SafeUrl[] = [];
  productId :  number;
  constructor(imageList : SafeUrl[], productId:number) {
    this.imageList = imageList;
    this.productId = productId;
  }

}
