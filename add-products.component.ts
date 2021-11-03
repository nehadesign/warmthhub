import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  providers:[ProductService]
})
export class AddProductsComponent implements OnInit {

  newProduct: any = {
    name: String ,
    category: String ,
    price: String,
    description: String ,
    hidden: Boolean ,
    comments: String ,
    inventory: String ,
    productImages: String ,
    size: String,
    color: String ,
    rating: String
  };

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
alert("hi");
  }
  public addNewProduct(newProduct : any): void{
    this.productService.addProduct(newProduct)
  }

}
