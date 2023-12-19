import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { DialogData } from '../../model/modal.model';
import { Products } from '../../model/products.model';
@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatGridListModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class ModalComponent implements OnInit {
  type: string;
  message: string;

  product = {} as Products;

  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  options = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.message = this.data.message;

    if(this.data.isData){
      this.patchValue();
    }
  }

  patchValue(){
    const patchData = this.data.hasData;
    this.options.controls['name'].patchValue(patchData.name);
    this.options.controls['description'].patchValue(patchData.description);
    this.options.controls['quantity'].patchValue(patchData.quantity)
    this.options.controls['price'].patchValue(patchData.price)
  }

  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }


  onEditProduct(){

    this.product.name = this.options.controls['name'].value ? this.options.controls['name'].value : "";
    this.product.description = this.options.controls['description'].value ?  this.options.controls['description'].value : "";
    this.product.quantity = Number(this.options.controls['quantity'].value);
    this.product.price = Number(this.options.controls['price'].value);
    this.product.id = this.data.hasData.id;
    console.log("EDIT PRODUCT",this.product);
    this.dialogRef.close(this.product)
  }
  //PRODUCTS
  onSaveProduct() {
    if(this.type === 'product'){
      this.product.name = this.options.controls['name'].value ? this.options.controls['name'].value : "";
      this.product.description = this.options.controls['description'].value ?  this.options.controls['description'].value : "";
      this.product.quantity = Number(this.options.controls['quantity'].value);
      this.product.price = Number(this.options.controls['price'].value);
      this.product.id = this.data.hasData.id;
      this.dialogRef.close(this.product)
    }
  }

  onDelete(value: boolean){
    this.dialogRef.close(value)
  }
}
