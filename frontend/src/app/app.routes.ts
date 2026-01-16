import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { noAuthGuard } from './core/guards/no-auth/no-auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
    canActivate: [noAuthGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/register/register.component').then(
        (m) => m.RegisterComponent
      ),
    canActivate: [noAuthGuard],
  },
  {
    path: 'user-profile',
    loadComponent: () =>
      import('./features/user-profile/user-profile.component').then(
        (m) => m.UserProfileComponent
      ),
    canActivate: [authGuard],
  },

  // Novos caminhos para CRUD
  {
    path: 'enderecos',
    loadComponent: () =>
      import('././features/enderecos/enderecos.component').then(
        (m) => m.EnderecosComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'pessoafisica',
    loadComponent: () =>
      import('././features/pessoafisica/pessoafisica.component').then(
        (m) => m.PessoaFisicaComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'pessoajuridica',
    loadComponent: () =>
      import('././features/pessoajuridica/pessoajuridica.component').then(
        (m) => m.PessoaJuridicaComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },

  
];
