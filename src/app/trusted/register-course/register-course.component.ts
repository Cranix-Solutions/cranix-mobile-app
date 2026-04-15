import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { CrxCalendarService } from 'src/app/services/crx-calendar.service';
import { Course, CrxCalendar, User } from 'src/app/shared/models/data-model';
import { EventClickArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridWeek from '@fullcalendar/timegrid';
import { interval, takeWhile } from 'rxjs';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { SystemService } from 'src/app/services/system.service';
import { WindowRef } from 'src/app/shared/models/ohters';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  standalone: false,
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss'],
})
export class RegisterCourseComponent implements OnInit {

  selectedCourse: Course
  calendarOptions: any = {}
  instituteName: string = ""
  events: any[] = []
  myEvents: CrxCalendar[] = []
  nativeWindow: any
  alive: boolean = true
  isOpened: boolean = true
  user: User
  id: number
  lastSeen: number;

  constructor(
    private authService: AuthenticationService,
    private langService: LanguageService,
    private objectService: GenericObjectService,
    private route: ActivatedRoute,
    private systemService: SystemService,
    public courseService: CourseService,
    public calendarService: CrxCalendarService,
    public win: WindowRef
  ) {
    this.systemService.getInstituteName().subscribe((val) => { this.instituteName = val })
    this.user = this.authService.session.user;
    this.id = this.route.snapshot.params['id'];
    this.nativeWindow = win.getNativeWindow();
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
    this.myEvents = []
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
            this.myEvents.push(app)
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
    let html = '<h2>' + this.selectedCourse.title + '</h2>'
    //html += this.selectedCourse
    for(let app of this.myEvents) {
      html += '<p>' + this.langService.trans("From") + ": " + app.start + this.langService.trans("Until") + ": " + app.end + this.langService.trans("Location") + ": " + app.location + "</p>"
    }
    var hostname = window.location.hostname;
    var protocol = window.location.protocol;
    var port = window.location.port;
    sessionStorage.setItem('printPage', html);
    if (port) {
      this.nativeWindow.open(`${protocol}//${hostname}:${port}`);
      sessionStorage.removeItem('shortName');
    } else {
      this.nativeWindow.open(`${protocol}//${hostname}`);
      sessionStorage.removeItem('shortName');
    }
    sessionStorage.removeItem('printPage');
    sessionStorage.removeItem('instituteName');
  }

  mailRegistration(){

  }

  calendarRegistration(){
    this.calendarService.downloadCalendarFile(this.myEvents, this.selectedCourse.title)
  }
}
