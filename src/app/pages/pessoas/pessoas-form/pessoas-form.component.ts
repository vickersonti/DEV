import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductModel } from 'src/app/core/model/product.model';
import { PessoasService } from '../services/pessoas.service';

@Component({
  selector: 'app-pessoas-form',
  templateUrl: './pessoas-form.component.html',
  styleUrls: ['./pessoas-form.component.scss']
})
export class PessoasFormComponent implements OnInit {
  mode!: string;
  id!: number;
  formPessoa!: FormGroup;
  pessoa: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PessoasFormComponent>,
    private api: PessoasService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.mode = this.data.mode;
    this.id = this.data.id;

    this.formPessoa = this.formBuilder.group({
      id:[''],
      name:['',Validators.required],
      birth:['',Validators.required],
      nationality:['',Validators.required],
      naturalness:['',Validators.required],
      phone:['',Validators.required],
    });

    switch (this.mode) {
      case 'create':
        this.formPessoa.enable();
        break;

      case 'view':
        this.formPessoa.disable();
        this.getPessoaId();
        break;

      case 'edit':
        this.formPessoa.enable();
        this.getPessoaId();
        break;
    }
  }
  private getPessoaId(): void {
    this.api.getIdPessoa(this.id)
      .subscribe({
        next: (res: ProductModel) => {
          this.formPessoa.patchValue(res);
        },
        error: (error: any) => {
          console.log(error)
        }
      })
  }


  addPessoa() {
    const values = this.formPessoa.value;
    console.log(values)
    if (this.formPessoa.invalid ) {
      this.formPessoa.markAllAsTouched();
      return;
    }
    if(this.mode === 'create'){
      this.api.postPessoa(values).subscribe({
        next: () => {
          this.formPessoa.reset();
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
    const values = this.formPessoa.value;

    console.log(values.name.toString())

    this.api.updatePessoa(this.id, values).subscribe({
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
    this.formPessoa.enable();
  }


  exit(): void {
      this.dialogRef.close();
  }
}
