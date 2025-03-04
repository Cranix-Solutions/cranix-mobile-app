import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';

const routes: Routes = [
  {
    path: '',
    children: [
        { path: 'cephalix', pathMatch: 'prefix',
          loadChildren: () => import('./cephalix/cephalix.module').then( m => m.CephalixModule)
        },
        { path: 'cranix', pathMatch: 'prefix',
          loadChildren: () => import('./cranix/cranix.module').then(m => m.CranixModule)
        },{
          path: 'edu', pathMatch: 'prefix',
          loadChildren: () => import('./edu/edu.module').then(m => m.EduModule)
        }
    ]
  }
];

@NgModule({
  imports: [
    CranixSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class ProtectedPageModule {}
