import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { SpinnerComponent } from 'src/app/shared/components/spinner/spinner.component';
import { PRODUCT_STATUS } from 'src/app/shared/constant/dialog-status.costant';
import { PRODUCTS } from 'src/app/shared/constant/product.constant';
import { Products, ProductsDB } from 'src/app/shared/model/products.model';
import { LoaderService } from 'src/app/shared/services/loader/loader.service';
import { SnackBarService } from 'src/app/shared/services/modal/modal.service';
import { PouchDBService } from 'src/app/shared/services/pouchdb/pouchdb.service';
import { UserLogin } from 'src/app/shared/state/user/user.model';
import { UserState } from 'src/app/shared/state/user/user.state';
import 'tw-elements';
@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  imports: [
    CommonModule,
    MatDialogModule,
    ModalComponent,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    SpinnerComponent
  ],
  providers: [SnackBarService, LoaderService],
  standalone: true,
})
export class ProductsComponent implements OnInit, AfterViewInit {
  products: Products[] = [];
  showModal = false;

  displayedColumns: string[] = PRODUCTS;
  @Select(UserState) userDetails$: Observable<UserLogin>;

  dataSource = new MatTableDataSource<Products>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.getProduct();
  }
  constructor(
    private _pouchDBService: PouchDBService,
    public dialog: MatDialog,
    private _snackBarService: SnackBarService,
    private _loaderService: LoaderService
  ) {
    this.userDetails$.subscribe((user) => {});
    this._loaderService.showLoader();
  }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct() {
    //FETCH CURRENT PRODUCTS
    this._pouchDBService.fetchDB('Products').then((prod: any) => {
      this.dataSource = new MatTableDataSource(prod?.data);
      this._loaderService.hideLoader();
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  toggleModal() {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        type: 'product',
        isData: false,
      },
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.onAdd(result);
      this._loaderService.showLoader();
    });
  }

  onDeleteProduct(product: Products) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        type: 'delete',
        message: 'Are you sure you want to remove ' + product.name + ' ?',
      },
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onDelete(product);
        this._loaderService.showLoader();
        this._snackBarService.onSuccess(5000, PRODUCT_STATUS.success_product);
      }
    });
  }

  onEditProduct(data: Products) {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        type: 'product',
        isData: true,
        hasData: data,
      },
      width: '30rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onEdit(result);
        this._loaderService.showLoader();
      }
    });
  }
  onAdd(data: Products) {
    //REMOVE IF BACKEND IS LIVE
    this._pouchDBService.fetchDB('Products').then((product: any) => {
      data.id = product.data.length + Math.random() * 10;
      product.data.push(data);

      this._pouchDBService.updateDB('Products', product.data).then((x) => {
        this.getProduct();
      });
    });
  }

  onDelete(data: Products) {
    //REMOVE IF BACKEND IS LIVE
    this._pouchDBService.fetchDB('Products').then((product: any) => {
      const filterData = product.data.filter((x: any) => x.id !== data.id);
      product.data = filterData;

      this._pouchDBService.updateDB('Products', product.data).then((x) => {
        this.getProduct();

      });
    });
  }

  onEdit(data: Products) {
    //REMOVE IF BACKEND IS LIVE
    this._pouchDBService.fetchDB('Products').then((product: any) => {
      // const filterData = product.data.filter((x: any) => x.id === data.id)[0];
      product.data.forEach((x: any) => {
        if (x.id === data.id) {
          x.name = data.name;
          x.description = data.description;
          x.quantity = data.quantity;
          x.price = data.price;
        }
      });

      this._pouchDBService.updateDB('Products', product.data).then((x) => {
        this.getProduct();
      });
    });
  }
}
