import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./public/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'public',
    loadChildren: () => import('./public/public.module').then(m => m.PublicPageModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedPageModule)
  },
  {
    path: 'trusted',
    loadChildren: () => import('./trusted/trusted.modules').then(m => m.TrustedModule)
  },
  {
    path: 'logout',
    loadChildren: () => import('./protected/logout/logout.module').then( m => m.LogoutPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        preloadingStrategy: PreloadAllModules
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}