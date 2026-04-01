import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './public/login/login.page';
import { MobileLoginPage } from './public/login/mobile-login.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'mobillogin',
    component: MobileLoginPage
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
  },
  {
    path: 'cephalix-support',
    loadChildren: () => import('./protected/cranix/cephalix-support/cephalix-support.module').then( m => m.CephalixSupportPageModule)
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
