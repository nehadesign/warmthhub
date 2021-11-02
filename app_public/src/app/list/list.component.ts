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
  name!: string;
  ngOnInit(): void {
    // Check for the PARAMS if there is no prams then get all the products

    this.route.params.subscribe((params) => {
      console.log(params);
      if (params.category) {
        this.category = params.category;
        console.log('recordId', this.category);
        this.service.getProductByCategory(this.category).subscribe(
          (res) => {
            console.log('Res from Category API ', res);
            if (res && res.data) {
              this.products = res.data;
            }
          },
          (err) => {
            console.log('ERROR : ', err.message);
          }
        );
      } else if (params.name) {
        this.name = params.name;
        this.service.getProductByName(this.name).subscribe(
          (res) => {
            console.log('Res from name API ', res);
            if (res && res.data) {
              this.products = res.data;
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
            if (res && res.data) {
              this.products = res.data;
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
