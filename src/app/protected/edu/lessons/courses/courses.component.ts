import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Course, CrxCalendar, Room } from 'src/app/shared/models/data-model';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridWeek from '@fullcalendar/timegrid';
import { CrxCalendarService } from 'src/app/services/crx-calendar.service';
@Component({
  standalone: false,
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {

  calendarOptions: CalendarOptions;
  context: any;
  events: any[];
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
    private calendarS: CrxCalendarService,
    public courseService: CourseService,
    public objectService: GenericObjectService,
    public utilService: UtilsService
  ) {
    this.context = { componentParent: this }
  }

  ngOnInit() {
  }

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

  createCalendarOptions(){
    this.calendarOptions = {
      locale: 'de',
      height: "100%",
      slotMinTime: "07:00",
      slotMaxTime: "20:00",
      validRange: {
        start: this.selectedCourse.startDate,
        end: this.utilService.nextDay(this.selectedCourse.endDate)
      },
      plugins: [
        interactionPlugin,
        timeGridWeek
      ],
      customButtons: {
        addEvent: {
          text: "+",
          click: this.handleDateSelect.bind(this)
        }
      },
      headerToolbar: {
        left: '',
        center: 'title',
        right: 'addEvent'
      },
      firstDay: 1,
      initialView: 'timeGridWeek',
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventChange: this.handleEventChange.bind(this),
      editable: this.authService.isOneOfAllowed(['course.manage', 'course.use']),
      selectable: true,
      weekNumbers: true
    };
  }
  redirectToEdit(course: Course) {
    let now = new Date();
    if (!course) {
      this.selectedCourse = new Course()
      this.selectedCourse.startDate = this.utilService.formatDateKey(now);
      this.selectedCourse.endDate = this.utilService.formatDateKey(now);
      this.title = "Add Course"
    } else {
      this.selectedCourse = course
      this.title = "Edit Course"
      let start = new Date(this.selectedCourse.startDate).valueOf()
      this.isUpcomming = (now.valueOf() < start)
    }
    this.createCalendarOptions();
    this.events = this.selectedCourse.appointments;
    console.log(this.selectedCourse)
    console.log(this.calendarOptions)
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

  deleteSelectedCourse(modal) {
    this.objectService.deleteObjectDialog(this.selectedCourse, 'course', '')
    modal.dismiss()
    this.isModalOpen = false
  }
  startTimeSet() {

  }

  //Manage appointments
  handleDateSelect(arg: DateSelectArg) {
    let start = new Date()
    let end = new Date()
    if (arg != null && arg.start != null) {
      if (arg.start.getTime() < start.getTime()) {
        this.objectService.errorMessage("You can not create event in the past.")
        return
      }
      start = arg.start
      end = arg.end
    }
    /*this.addEditEventTitle = "Add new event"
    this.selectedEvent = new CrxCalendar();
    this.selectedEvent.start = start
    this.selectedEvent.end = end
    this.adaptEventTimes()
    this.setOpen(true)*/
    console.log(arg)
  }
  handleEventClick(arg: EventClickArg) {
    console.log(arg.event.id)
    //TODO OPEN MODIFY APPOINTMENT
  }
  handleEventChange(arg: EventChangeArg) {
    console.log(arg.event._instance?.range)
    this.calendarS.getById(arg.event.id).subscribe((val) => {
      val.start = arg.event._instance?.range.start
      val.end = arg.event._instance?.range.end
      this.calendarS.modify(val).subscribe((val2) => {
        this.objectService.getAllObject('course');
        this.objectService.responseMessage(val2)
      })
    })
  }

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
  deleteAppointment(index: number) {
    console.log(index)
    this.selectedCourse.appointments.splice(index, 1)
    this.isModified = true;
  }

}
