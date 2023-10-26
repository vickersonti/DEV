import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isCollapsed = true;
  isSidebarPinned = false;
  isSidebarToggeled = false;

  constructor(
    private router: Router 
  ) { }

  toggleSidebar() {
    this.isSidebarToggeled = ! this.isSidebarToggeled;
  }

  toggleSidebarPin() {
    this.isSidebarPinned = ! this.isSidebarPinned;
  }

  getSidebarStat() {
    return {
      isSidebarPinned: this.isSidebarPinned,
      isSidebarToggeled: this.isSidebarToggeled
    }
  }

  logout(){
    const confirmation = confirm('Deseja sair do sistema ??')
    if(confirmation){
      localStorage.removeItem('token')
      this.router.navigate(['/']);   
    }
  }
}
