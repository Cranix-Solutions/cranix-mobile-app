import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';

import { CranixSharedModule } from 'src/app/shared/cranix-shared.module';
import { RegisterCourseComponent } from './register-course/register-course.component';
import { RegisterPTMComponent } from './register-ptm/register-ptm.component';
const routes: Routes = [
  {
    path: '',
    children: [
        { 
          path: 'registerPTM/:id',
          component: RegisterPTMComponent
        },
        { 
          path: 'registerCourse/:id',
          component: RegisterCourseComponent
        }
    ]
  }
];

@NgModule({
  imports: [
    CranixSharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule,RegisterPTMComponent, RegisterCourseComponent],
  declarations: [RegisterPTMComponent, RegisterCourseComponent]
})
export class TrustedModule {}
