import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosListComponent } from './pages/produtos-list/produtos-list.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';
import { PessoasComponent } from './pages/pessoas/pessoas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashBoardComponent, canActivate:[authGuard],
    children : [
        {path:'produtos', component: ProdutosListComponent},
        {path:'pessoas', component: PessoasComponent},
      ]
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
