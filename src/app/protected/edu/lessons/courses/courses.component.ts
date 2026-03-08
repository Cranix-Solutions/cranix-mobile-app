import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
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
export class CoursesComponent implements OnInit {

  context: any;
  isAddAppointmentOpen: boolean = false;
  isModalOpen: boolean = false
  isUpcomming: boolean = false
  isModified: boolean = false
  newAppointment: boolean = true;
  selectedAppointment: CrxCalendar;
  selectedCourse: Course;
  title: string;

  constructor(
    private alertController: AlertController,
    public authService: AuthenticationService,
    public courseService: CourseService,
    public objectService: GenericObjectService,
    public utilService: UtilsService
  ) {
    this.context = { componentParent: this }
  }

  ngOnInit() { }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.isModified = false
        this.isModalOpen = false;
      },
    },
  ];
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Warning',
      message: 'You have not saved your changes',
      buttons: this.alertButtons,
    });

    await alert.present();
  }
  //Manage course
  redirectToEdit(course: Course) {
    if (!course) {
      this.selectedCourse = new Course()
      this.title = "Add Course"
    } else {
      this.selectedCourse = course
      this.title = "Edit Course"
      let now = new Date().valueOf();
      let start = new Date(this.selectedCourse.start).valueOf()
      this.isUpcomming = (now < start)
    }
    this.utilService.adaptPtmTimes(this.selectedCourse)
    console.log(this.selectedCourse)
    this.isModalOpen = true
  }
  
  closeAddEditModal(modal: any) {
    if (this.isModified) {
      this.presentAlert()
    } else {
      modal.dismiss();
      this.isModalOpen = false;
      this.objectService.getAllObject('course');
    }
  }
  closeAddEditAppontment(modal: any) {
    modal.dismiss();
    this.isAddAppointmentOpen = false;
  }
  addEditCourse(modal: any) {
    console.log(this.selectedCourse)
    this.isModified = false;
    if (this.selectedCourse.id) {
      this.courseService.patch(this.selectedCourse).subscribe(
        (val) => { 
          this.objectService.responseMessage(val)
          this.objectService.getAllObject('course');
        }
      )
    } else {
      this.courseService.add(this.selectedCourse).subscribe(
        (val) => { 
          this.objectService.responseMessage(val)
          this.objectService.getAllObject('course');
        }
      )
    }
    this.closeAddEditModal(modal)
  }

  deleteSelectedCourse(modal){
    this.objectService.deleteObjectDialog(this.selectedCourse,'course', '')
    modal.dismiss()
    this.isModalOpen = false
  }
  startTimeSet() {

  }
  //Manage appointments
  openAddEditAppointment(appointment: CrxCalendar) {
    if (appointment) {
      this.newAppointment = false

      this.utilService.adaptEventTimes(appointment);
      this.selectedAppointment = appointment
    } else {
      this.newAppointment = true
      this.selectedAppointment = new CrxCalendar();
    }
    this.isAddAppointmentOpen = true
  }
  addEditAppointment(modal) {
    if (this.selectedAppointment.creator) {
      this.selectedAppointment.creatorId = this.selectedAppointment.creator.id;
    }
    if (this.newAppointment) {
      this.selectedCourse.appointments.push(this.selectedAppointment);
    }
    this.isModified = true;
    this.closeAddEditAppontment(modal)
  }
  deleteAppointment(index: number){
    console.log(index)
    this.selectedCourse.appointments.splice(index,1)
    this.isModified = true;
  }

}
