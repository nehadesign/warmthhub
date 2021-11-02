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
  ngOnInit(): void {
    // Check for the PARAMS if there is no prams then get all the products

    this.route.params.subscribe((params) => {
      console.log(params);
      this.category = params.category;
      console.log('recordId', this.category);

      if (this.category) {
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
      } else {
        this.service.getAllProducts().subscribe(
          (res) => {
            console.log('Res from API ', res);
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
