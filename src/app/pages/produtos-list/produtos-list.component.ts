import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from "@angular/material/table";
import { ProductModel } from 'src/app/core/model/product.model';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutoService } from './services/produto.service';
import { HttpParams } from '@angular/common/http';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  searchBy = '';
  searchType = [
    { id: 0, field: 'id', name: "Código", isText: false },
    { id: 1, field: 'name', name: "Nome", isText: true },
    { id: 2, field: 'category', name: "Categoria", isText: true },     
  ];  
  
  dataSource = new MatTableDataSource<ProductModel>;  
  displayedColumns: string[] = [ "id", "name", "price", "category", "stock", "actions" ];
  searchForm!: FormGroup;
  habilitaPesquisa: boolean = true;  
  menuIndex: number | undefined = undefined;
  labelAcaoAtualtemListaMenu: string = '';

  pageEvent: PageEvent = {
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,    
    private api: ProdutoService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,   
  ) { 
    this.searchForm = this.formBuilder.group({
      searchBy: [null, Validators.required],
      searchType: [null, Validators.required],
    })
  };
  
  ngOnInit(): void {   
    this.getProductslist(this.pageEvent);  
  }

  getProductslist(event: PageEvent){       
      if (this.pageEvent.pageSize !== event.pageSize){
        event.pageIndex = 0;
      }
      this.pageEvent = event;
          
      const key = this.searchForm?.controls['searchBy'].value;
      const value = this.searchForm?.controls['searchType'].value; 
  
      this.pageEvent = event;
      let params = new HttpParams()      
  
      if (!this.habilitaPesquisa) {
        params = params.set(key, value)
      }
  
      this.api.getAllProduto(params).subscribe({
        next: (res): void => {         
          this.dataSource = res;
          this.pageEvent.length = res.length;
        }
      })
  }
  
  // MÉTODOS DOS BOTÕES!
  deletProduct(produtoId: number) {    
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: "Tem certeza que deseja excluir?",
      });  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result){
          this.api.deleteProduto(produtoId).subscribe({
            next: () => {
              this.getProductslist(this.pageEvent);
              this._snackBar.open("Dados salvos com sucesso!!", '', {duration: 2000});
            },
            error: (error) => {
              console.log(error)
            }
          })    
        }
      });
  };

  openDialog( id?: number, mode?: string){
    return this.dialog.open(ProdutosFormComponent, {
      width: "25%",
         
      data: { id, mode },      
    }).afterClosed().subscribe(() => {
      this.getProductslist(this.pageEvent);  
    })
  }

  pesquisar(): void {       
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
      this.habilitaPesquisa = false;      
      this.getProductslist(this.pageEvent);      
  }

  limparPesquisa(full = false): void {    
    if (!this.habilitaPesquisa) {
      if (full) {
        this.searchForm?.reset();        
        this.habilitaPesquisa = true;
        this.getProductslist(this.pageEvent);  
      }
      else {
        this.habilitaPesquisa = true;
        
      }
    }
  }
}
