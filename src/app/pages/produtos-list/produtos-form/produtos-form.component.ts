import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModel } from 'src/app/core/model/product.model';
import { ProdutoService } from '../services/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.scss']
})
export class ProdutosFormComponent implements OnInit {

  mode!: string;
  id!: number;
  formProduto!: FormGroup;
  produto: any;

  constructor(  
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ProdutosFormComponent>,    
    private api: ProdutoService, 
    public dialog: MatDialog,
    private _snackBar: MatSnackBar   
  ) { }
  
  ngOnInit(): void {    
    
    this.mode = this.data.mode;
    this.id = this.data.id;    

    this.formProduto = this.formBuilder.group({
      id:[''],
      name:['',Validators.required],
      price:['',Validators.required],
      category:['',Validators.required],      
      stock:['',Validators.required],      
    });

    switch (this.mode) {
      case 'create':
        this.formProduto.enable();        
        break;

      case 'view':
        this.formProduto.disable();
        this.getProdutoId();
        break;

      case 'edit':
        this.formProduto.enable();        
        this.getProdutoId();
        break;   
    }
  }
  private getProdutoId(): void {
    this.api.getIdProduto(this.id)
      .subscribe({
        next: (res: ProductModel) => {          
          this.formProduto.patchValue(res);         
        },
        error: (error) => {
          console.log(error)       
        }
      })
  }


  addProduto() {    
    const values = this.formProduto.value;
    console.log(values)
    if (this.formProduto.invalid ) {
      this.formProduto.markAllAsTouched();
      return;
    }    
    if(this.mode === 'create'){
      this.api.postProduto(values).subscribe({
        next: () => {
          this.formProduto.reset();
          this.dialogRef.close();
          this._snackBar.open("Dados salvos com sucesso!!", '', {duration: 2000});
        },
        error: (error) => {          
          console.log(error)
        },
      });
    }else
      this.save();
  };

  save(){
    const values = this.formProduto.value;
    
    console.log(values.name.toString())

    this.api.updateProduto(this.id, values).subscribe({
      next: () => {
        this.dialogRef.close();
        this._snackBar.open("Dados salvos com sucesso!!", '', {duration: 2000, });
      },
      error: (error: any) => {        
        console.log(error);
      },
    });    
  }

  changeToEdit(): void {
    this.mode = "edit";
    this.formProduto.enable();
  }


  exit(): void {  
      this.dialogRef.close();
  }
}
