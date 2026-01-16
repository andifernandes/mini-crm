// src/app/shared/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

// PrimeNG
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

// Angular
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], 
  standalone: true,
  imports: [CommonModule, NgIf, MenubarModule, ButtonModule],
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {
    this.items = [
      { label: 'Endereços', routerLink: '/enderecos', icon: 'pi pi-map' },
      { label: 'Pessoa Física', routerLink: '/pessoafisica', icon: 'pi pi-user' },
      { label: 'Pessoa Jurídica', routerLink: '/pessoajuridica', icon: 'pi pi-briefcase' },
    ];
  }

  logout() {
    localStorage.setItem('token', "");
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  userprofile() {
    this.router.navigate(['/user-profile']);
  }
}
