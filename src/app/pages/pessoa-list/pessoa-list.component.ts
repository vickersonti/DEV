import { Component, ViewChild } from '@angular/core';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
import { HttpParams } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PessoaModel } from 'src/app/core/model/pessoa.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { PessoaService } from './services/pessoa.service';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent {
  searchBy = '';
  searchType = [
    { id: 0, field: 'id', name: "Código", isText: false },
    { id: 1, field: 'name', name: "Nome", isText: true },
    { id: 2, field: 'category', name: "Categoria", isText: true },     
  ];  
  
  dataSource = new MatTableDataSource<PessoaModel>;  
  displayedColumns: string[] = [ "id", "name", "idade", "naturalidade", "nacionalidade", "telefone","actions" ];
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
    private api: PessoaService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,   
  ) { 
    this.searchForm = this.formBuilder.group({
      searchBy: [null, Validators.required],
      searchType: [null, Validators.required],
    })
  };
  
  ngOnInit(): void {   
    this.getPessoalist(this.pageEvent);  
  }

  getPessoalist(event: PageEvent){       
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
  
      this.api['getAllPessoa'](params).subscribe({
        next: (res): void => {         
          this.dataSource = res;
          this.pageEvent.length = res.length;
        }
      })
  }
  

  deletPessoa(pessoaId: number) {    
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: "Tem certeza que deseja excluir?",
      });  
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if(result){
          this.api['deletePessoa'](pessoaId).subscribe({
            next: () => {
              this.getPessoalist(this.pageEvent);
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
    return this.dialog.open(PessoaFormComponent, {
      width: "25%",
         
      data: { id, mode },      
    }).afterClosed().subscribe(() => {
      this.getPessoalist(this.pageEvent);  
    })
  }

  pesquisar(): void {       
    if (this.searchForm.invalid) {
      this.searchForm.markAllAsTouched();
      return;
    }
      this.habilitaPesquisa = false;      
      this.getPessoalist(this.pageEvent);      
  }

  limparPesquisa(full = false): void {    
    if (!this.habilitaPesquisa) {
      if (full) {
        this.searchForm?.reset();        
        this.habilitaPesquisa = true;
        this.getPessoalist(this.pageEvent);  
      }
      else {
        this.habilitaPesquisa = true;
        
      }
    }
  }

}
