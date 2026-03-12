import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Course, CrxCalendar, Room } from 'src/app/shared/models/data-model';
import { CalendarOptions, DateSelectArg, EventChangeArg, EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
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
    private calendarService: CrxCalendarService,
    public courseService: CourseService,
    public objectService: GenericObjectService,
    public utilService: UtilsService
  ) {
    this.context = { componentParent: this }
  }

  ngOnInit() {
  }

  ////////////////////////////////////////////////////
  // Functions to manage course
  ////////////////////////////////////////////////////
  /**
   * Function to alert by closing edit course
   */
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

  /**
   * Create calendar options when opening or modifying a course.
   * This is necessary to adapt the valide range
   */
  createCalendarOptions(){
    this.calendarOptions = {
      hiddenDays: this.calendarService.notInRange(this.selectedCourse.startDate, this.selectedCourse.endDate),
      initialDate: this.selectedCourse.startDate,
      locale: 'de',
      height: "100%",
      slotMinTime: "07:00",
      slotMaxTime: "20:00",
      /*validRange: {
        start: this.selectedCourse.startDate,
        end: this.calendarService.nextDay(this.selectedCourse.endDate)
      },*/
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

  /**
   * Make appointments of selected course clored based on the count of participants
   */
  adaptEvents(){
    let clonedEvents = structuredClone(this.selectedCourse.appointments)
    for(let app of clonedEvents){
      if(app.userIds.length == 0){
        app['backgroundColor'] = 'green'
      }else if(app.userIds.length < this.selectedCourse.countOfParticipants ){
        app['backgroundColor'] = 'blue'
        app['title'] = app['title'] + " \n" + app.userIds.length + ' participants'
      }else{
        app['backgroundColor'] = 'red'
      }
    }
    this.events = clonedEvents
  }
  /**
   * Open a cours to edit
   * @param course
   */
  redirectToEdit(course: Course) {
    let now = new Date();
    if (!course) {
      this.selectedCourse = new Course()
      this.selectedCourse.startDate = this.calendarService.formatDateKey(now);
      this.selectedCourse.endDate = this.calendarService.formatDateKey(now);
      this.title = "Add Course"
    } else {
      this.selectedCourse = course
      this.title = "Edit Course"
      let start = new Date(this.selectedCourse.startDate).valueOf()
      this.isUpcomming = (now.valueOf() < start)
    }
    this.createCalendarOptions();
    this.adaptEvents()
    console.log(this.selectedCourse)
    console.log(this.calendarOptions)
    this.isModalOpen = true
  }

  /**
   * Close the edit course modal.
   * Befor closing check if there a some unsaved changes.
   * @param modal 
   */
  closeAddEditModal(modal: any) {
    if (this.isModified) {
      this.presentAlert()
    } else {
      modal.dismiss();
      this.isModalOpen = false;
      this.objectService.getAllObject('course');
    }
  }

  /**
   * Apply all changes.
   */
  addEditCourse(modal: any) {
    console.log(this.selectedCourse)
    this.isModified = false;
    if (this.selectedCourse.id) {
      for(let app of this.selectedCourse.appointments){
        if(app.id < 1){
          app.id = null
        }
      }
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

  /**
   * Delete a course inclusive all appointments
   * @param modal
   */
  deleteSelectedCourse(modal) {
    this.objectService.deleteObjectDialog(this.selectedCourse, 'course', '')
    modal.dismiss()
    this.isModalOpen = false
  }
  startTimeSet() {

  }

  //////////////////////////////////////////////
  // Functions to manage appointments
  //////////////////////////////////////////////
  /***
   * Open modal to edit an existing or add a new appointment
   */
  openAddEditAppointment() {
    this.calendarService.adaptEventTimes(this.selectedAppointment)
    if (this.selectedAppointment.id) {
      this.newAppointment = false
    } else {
      this.newAppointment = true
    }
    console.log(this.events)
    this.events = []
    this.isAddAppointmentOpen = true
  }

  /**
   * Close the modal for add edit appointments.
   * @param modal 
   */
  closeAddEditAppontment(modal: any) {
    modal.dismiss();
    this.isAddAppointmentOpen = false;
    this.adaptEvents()
  }
  
  /**
   * Apply changes on the selected appointment. This changes will not be saved immediately in the database.
   * @param modal 
   */
  addEditAppointment(modal) {
    if (this.selectedAppointment.creator) {
      this.selectedAppointment.creatorId = this.selectedAppointment.creator.id;
    }
    if (this.newAppointment) {
      this.selectedCourse.appointments.push(this.selectedAppointment);
    }
    this.adaptEvents()
    console.log(this.events)
    this.isModified = true;
    this.closeAddEditAppontment(modal)
  }

  deleteAppointment(index: number) {
    console.log(index)
    this.selectedCourse.appointments.splice(index, 1)
    this.adaptEvents()
    this.isModified = true;
  }

  /**
   * Handle the event of full calendar if the user hase selected a time range
   * @param arg The selected date range
   * @returns 
   */
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
    this.selectedAppointment = new CrxCalendar();
    this.selectedAppointment.start = start
    this.selectedAppointment.end = end
    this.openAddEditAppointment()
  }

  /**
   * Handle the event of full calendar if the user has clicked on an existing event. 
   * @param arg 
   */
  handleEventClick(arg: EventClickArg) {
    console.log(arg.event)
    let uuid = arg.event._def.extendedProps.uuid
    for( let app of this.selectedCourse.appointments){
      console.log(app)
      if(app.uuid == uuid){
        this.selectedAppointment = app
        break
      }
    }
    this.openAddEditAppointment()
  }

  /**
   * Handle the event of full-calendar when the user has moved or resized an existing event.
   * @param arg The time range change of the existing event
   */
  handleEventChange(arg: EventChangeArg) {
    console.log(arg.event)
    this.calendarService.getById(arg.event.id).subscribe((val) => {
      val.start = this.calendarService.oneHourEarlier(arg.event._instance?.range.start)
      val.end = this.calendarService.oneHourEarlier(arg.event._instance?.range.end)
      this.calendarService.modify(val).subscribe((val2) => {
        this.objectService.getAllObject('course');
        this.objectService.responseMessage(val2)
      })
    })
  }
}
