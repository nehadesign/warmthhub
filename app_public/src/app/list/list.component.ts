import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(private service: ProductService, private route: ActivatedRoute) {}
  products: any = [];
  category!: string;
  searchKeyWord!: string;
  noResultMessage!: string;
  ngOnInit(): void {
    // Check for the PARAMS if there is no prams then get all the products

    this.route.params.subscribe((params) => {
      console.log(params);
      this.products = [];
      if (params.category) {
        this.category = params.category;
        console.log('Category name', this.category);
        this.service.getProductByCategory(this.category).subscribe(
          (res) => {
            console.log('Res from Category API ', res);
            if (res && res.data && res.data.length > 0) {
              this.products = res.data;
            } else {
              this.noResultMessage = `Opps! No record is found, please come again later, we promise we will get something for you by then`;
            }
          },
          (err) => {
            console.log('ERROR : ', err.message);
          }
        );
      } else if (params.name) {
        this.searchKeyWord = params.name;
        this.service.getProductByName(this.searchKeyWord).subscribe(
          (res) => {
            console.log('Res from name API ', res);
            if (res && res.data && res.data.length > 0) {
              this.products = res.data;
            } else {
              this.noResultMessage = `No result found for the keyword '${this.searchKeyWord}', please try some other keyword.`;
            }
          },
          (err) => {
            console.log('ERROR : ', err.message);
          }
        );
      } else {
        this.service.getAllProducts().subscribe(
          (res) => {
            console.log('Res from all products API ', res);
            if (res && res.data && res.data.length > 0) {
              this.products = res.data;
            } else {
              this.noResultMessage = `Opps! No record is found, please come again later, we promise we will get something for you by then.`;
            }
          },
          (err) => {
            console.log('ERROR : ', err.message);
          }
        );
      }
    });
  }
}
