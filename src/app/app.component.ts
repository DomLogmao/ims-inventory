import { Component, OnInit } from '@angular/core';
import { PouchDBService } from './shared/services/pouchdb/pouchdb.service';
import { ProductService } from './shared/services/products/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'lnr-web';

  constructor(private pouchDBService: PouchDBService, private productService: ProductService) {
    this.pouchDBService.createDB();
  }

  ngOnInit(): void {

    //SET INITIAL PRODUCTS
    this.productService.get().then(data =>{
      this.pouchDBService.addDB({
        _id: 'Products',
        data
      });
    })





  }
}
