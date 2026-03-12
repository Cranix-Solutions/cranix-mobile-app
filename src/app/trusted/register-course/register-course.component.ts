import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CrxCalendarService } from 'src/app/services/crx-calendar.service';
import { Course, User } from 'src/app/shared/models/data-model';
import { EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import { interval, takeWhile } from 'rxjs';
import { GenericObjectService } from 'src/app/services/generic-object.service';

@Component({
  standalone: false,
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss'],
})
export class RegisterCourseComponent implements OnInit {

  selectedCourse: Course
  calendarOptions: any = {}
  events: any[] = []
  alive: boolean = true
  isOpened: boolean = true
  user: User
  id: number
  lastSeen: number;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private objectService: GenericObjectService,
    public courseService: CourseService,
    public calendarService: CrxCalendarService
  ) {
    this.user = this.authService.session.user;
    this.id = this.route.snapshot.params['id'];
    console.log(this.id)
  }

  ngOnInit(): void {
    console.log(this.id)
    this.alive = true
    this.readData()
    interval(5000).pipe(takeWhile(() => this.alive && this.isOpened)).subscribe((func => {
      this.refreshData();
    }))
  }
  ngOnDestroy(): void {
    this.alive = false
  }

  refreshData(){
    this.courseService.getLastChange(this.id).subscribe((val) => {
      let lastChange = new Date(val)
      if(val && lastChange.getTime() > this.lastSeen){
        this.readData()
      }
    })
  }
  readData() {
    this.events = []
    this.courseService.getByIdFree(this.id).subscribe(
      (val) => {
        this.lastSeen = new Date().getTime()
        let endReg = new Date(val.endRegistration).getTime()
        let startReg = new Date(val.startRegistration).getTime()
        if (this.lastSeen > endReg || this.lastSeen < startReg) {
          this.isOpened = false
        }
        this.selectedCourse = val
        this.createCalendarOptions()
        for(let app of this.selectedCourse.appointments){
          if(app.userIds.includes(this.user.id)){
            app['backgroundColor'] = 'blue'
          }else{
            app['backgroundColor'] = 'green'
          }
        }
        this.events = this.selectedCourse.appointments
      }
    )
  }

  /**
  * Handle the event of full calendar if the user has clicked on an existing event. 
  * @param arg 
  */
  handleEventClick(arg: EventClickArg) {
    console.log(arg.event)
    let uuid = arg.event._def.extendedProps.uuid
    for (let app of this.selectedCourse.appointments) {
      console.log(app)
      if (app.uuid == uuid) {
        if (app.userIds.includes(this.user.id)) {
          this.courseService.withdrawing(app.id).subscribe(
            (val) => {
              this.objectService.responseMessage(val)
              this.readData()
            }
          )
        } else {
          this.courseService.register(app.id).subscribe(
            (val) => {
              this.objectService.responseMessage(val)
              this.readData()
            }
          )
        }
      }
    }
  }

  /**
 * Create calendar options when opening or modifying a course.
 * This is necessary to adapt the valide range
 */
  createCalendarOptions() {
    this.calendarOptions = {
      locale: 'de',
      height: "100%",
      slotMinTime: "07:00",
      slotMaxTime: "20:00",
      validRange: {
        start: this.selectedCourse.startDate,
        end: this.calendarService.nextDay(this.selectedCourse.endDate)
      },
      plugins: [
        interactionPlugin,
        timeGridWeek
      ],
      customButtons: {
      },
      headerToolbar: {
        left: '',
        center: 'title',
        right: ''
      },
      firstDay: 1,
      initialView: 'timeGridWeek',
      eventClick: this.handleEventClick.bind(this),
      editable: false,
      selectable: true,
      weekNumbers: true
    };
  }

  printRegistration(){

  }

  mailRegistration(){

  }

  calendarRegistration(){

  }
}
