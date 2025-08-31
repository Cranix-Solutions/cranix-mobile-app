import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CrxObjectService } from 'src/app/services/crx-object-service'; 
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SubjectArea, TeachingSubject } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'app-teaching-subjects',
  templateUrl: './teaching-subjects.component.html',
  styleUrls: ['./teaching-subjects.component.scss'],
})
export class TeachingSubjectsComponent {

  newTeachingSubject: TeachingSubject = new TeachingSubject()
  newSubjectArea: SubjectArea = new SubjectArea()

  constructor(
    public authService: AuthenticationService,
    public crxObjectService: CrxObjectService,
    public objectService: GenericObjectService
  ) {
    this.crxObjectService.getSubjects()
    console.log(crxObjectService.subjects)
  }

  addSubject(object: TeachingSubject){
    this.crxObjectService.addSubject(object);
    this.newTeachingSubject = new TeachingSubject()
  }

  addSubjectArea(id:number, object: SubjectArea){
    this.crxObjectService.addSubjectArea(id, object)
    this.newSubjectArea = new SubjectArea()
  }

}
