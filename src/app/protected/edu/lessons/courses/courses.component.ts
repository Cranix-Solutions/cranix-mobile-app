import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Course, CrxCalendar, Room } from 'src/app/shared/models/data-model';

@Component({
  standalone: false,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent  implements OnInit {

  context: any;
  isAddAppointmentOpen: boolean = false;
  isModalOpen: boolean = false
  newAppointment: boolean = true;
  selectedAppointment: CrxCalendar;
  selectedCourse: Course;
  title: string;
  
  constructor(
    public authService: AuthenticationService,
    public courseService: CourseService,
    public objectService: GenericObjectService,
    public utilService: UtilsService
  ) { 
    this.context = {componentParent: this}
  }

  ngOnInit() {}

  //Manage course
  redirectToEdit(course: Course){
    if(!course){
      this.selectedCourse = new Course()
      this.title = "Add Course"
    } else {
      this.selectedCourse = course
      this.title = "Edit Course"
    }
    this.utilService.adaptPtmTimes(this.selectedCourse)
    console.log(this.selectedCourse)
    this.isModalOpen = true
  }
  closeAddEditModal(modal: any){
    modal.dismiss();
    this.isModalOpen = false;
  }
  closeAddEditAppontment(modal: any){
    modal.dismiss();
    this.isAddAppointmentOpen = false;
  }
  addEditCourse(modal: any){
    console.log(this.selectedCourse)
    if(this.selectedCourse.id){
      this.courseService.patch(this.selectedCourse).subscribe(
        (val) => { this.objectService.responseMessage(val)}
      )
    }else{
      this.courseService.add(this.selectedCourse).subscribe(
        (val) => { this.objectService.responseMessage(val)}
      )
    }
    this.closeAddEditModal(modal)
  }
  startTimeSet(){

  }
  //Manage appointments
  openAddEditAppointment(appointment: CrxCalendar) {
    if(appointment) {
      this.newAppointment = false
      this.selectedAppointment = appointment
    }else{
      this.newAppointment = true
      this.selectedAppointment = new CrxCalendar();
    }
    this.isAddAppointmentOpen = true
  }
  addEditAppointment(modal){
    if(this.selectedAppointment.creator) {
      this.selectedAppointment.creatorId = this.selectedAppointment.creator.id;
    }
    if(this.newAppointment) {
      this.selectedCourse.appointments.push(this.selectedAppointment);
    }
    this.closeAddEditAppontment(modal)
  }
}
