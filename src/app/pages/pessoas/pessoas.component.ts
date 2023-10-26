import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { PessoasModel } from 'src/app/core/model/pessoas.model';
import { PessoasService } from './services/pessoas.service';
import { HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog/confirmation-dialog.component';
import { PessoasFormComponent } from './pessoas-form/pessoas-form.component';

import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { SnackMessageComponent } from './snack-message/snack-message.component';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.scss']
})
export class PessoasComponent implements OnInit {

  searchBy = '';
  searchType = [
    { id: 0, field: 'id', name: "Código", isText: false },
    { id: 1, field: 'name', name: "Nome", isText: true },
    { id: 2, field: 'naturalness', name: "Naturalidade", isText: true },
  ];

  constructor(
    private api: PessoasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder
    ) {
      this.searchForm = this.formBuilder.group({
        searchBy: [null, Validators.required],
        searchType: [null, Validators.required],
      })
    }

   ngOnInit(): void {
    this.getPessoas();
   }


  getPessoas() {
    const key = this.searchForm?.controls['searchBy'].value;
    const value = this.searchForm?.controls['searchType'].value;

    let params = new HttpParams();

    if (!this.habilitaPesquisa) {
      params = params.set(key, value)
    }

    this.api.getAllPessoas(params).subscribe({
      next: (res): void => {
        this.dataSource = res;
      }
    })
  }


  deletePessoa(pessoasId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: "Tem certeza que deseja excluir?",
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.api.deletePessoa(pessoasId).subscribe({
          next: () => {
            this.getPessoas();
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
  return this.dialog.open(PessoasFormComponent, {
    width: "25%",

    data: { id, mode },
  }).afterClosed().subscribe(() => {
    this.getPessoas();
  })
}

btndownload = document.getElementById("btn-download");
pesquisar(): void {
  if (this.searchForm.invalid) {
    this.searchForm.markAllAsTouched();
    this.btndownload?.classList.add('none');
    return;
  }
    this.habilitaPesquisa = false;
    this.getPessoas();
    this.btndownload?.classList.remove('none');
  }

limparPesquisa(full = false): void {
  if (!this.habilitaPesquisa) {
    if (full) {
      this.searchForm?.reset();
      this.habilitaPesquisa = true;
      this.getPessoas();
    }
    else {
      this.habilitaPesquisa = true;

    }
  }
}

//config da imagem
// doc = new jsPDF('portrait', 'pt', 'a4');
// @ViewChild('content', {static:false}) el!: ElementRef; // referência no DOM

// durationInSeconds = 5;
// download(): void {
//   this._snackBar.openFromComponent(SnackMessageComponent, {
//     duration: this.durationInSeconds * 200,
//   });

//   html2canvas(this.el.nativeElement).then((canvas) => {
//     const imgData = canvas.toDataURL('image/jpeg');
//     const imageProps = this.doc.getImageProperties(imgData);
//     const pdfw = this.doc.internal.pageSize.getWidth();
//     const pdfh = (imageProps.height * pdfw) / imageProps.width;
//     this.doc.addImage(imgData,'PNG',0,0,pdfw,pdfh);
//     this.doc.save("download.pdf");
//   });
// }


   dataSource = new MatTableDataSource<PessoasModel>;
   displayedColumns: string[] = [ "id", "name", "birth", "nationality", "naturalness", "phone", "actions" ];
   searchForm!: FormGroup;
   habilitaPesquisa: boolean = true;
   menuIndex: number | undefined = undefined;
   labelAcaoAtualtemListaMenu: string = '';
}
