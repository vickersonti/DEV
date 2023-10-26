import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SignupService } from '../signup/services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form!: FormGroup;
  login= 'emerson';
  senha: number = 123;
  
  constructor(      
    private formBuilder: FormBuilder,    
    private router: Router,
    private _snackBar: MatSnackBar,
    private api: SignupService,
  ) { }

  ngOnInit(): void {   

    this.form = this.formBuilder.group({      
      user:['',Validators.required],
      password:['',Validators.required],      
    }); 

  }

  onSubmit(){
    if (this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    } 
    const values = this.form.value;
    console.log(values)

    this.api.getUser().subscribe((res: any)=>{
      console.log(res);
      const user =  res.find((a:any)=>{
        return a.user == values.user && a.password == values.password
      });
      console.log(user)
      if(user != undefined){     
        localStorage.setItem('token', Math.random().toString());
        this.router.navigate(['/dashboard/produtos']);

      }else{
        alert("Usuário ou senha invalido")
      }
    });
  }

  createLogin(){
    this.router.navigate(['/signup']);    
  }

}
