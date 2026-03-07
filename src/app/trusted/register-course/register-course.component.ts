import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { CourseService } from 'src/app/services/course.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Course, User } from 'src/app/shared/models/data-model';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss'],
})
export class RegisterCourseComponent  implements OnInit {

  selectedCourse: Course
  appointments = {}
  id: number
  user: User
  dates: string[] = []
  hours: string[] = []

  constructor(
      private route: ActivatedRoute,
      private authService: AuthenticationService,
      private courseService: CourseService,
      private utilsService: UtilsService
    ) {
    }
  
    ngOnInit() {
      this.user = this.authService.session.user;
      this.id = this.route.snapshot.params['id'];
      console.log(this.id)
      this.courseService.getByIdFree(this.id).subscribe(
        (val) => {
          this.appointments = this.utilsService.groupEventsByDate(val.appointments)
          this.selectedCourse = val
          for(let date of Object.keys(this.appointments)){
            for(let hour of Object.keys(this.appointments[date])){
              if(this.hours.indexOf(hour) == -1 ){
                this.hours.push(hour)
              }
            }
          }
          this.hours.sort()
          this.dates = Object.keys(this.appointments)
        }
      )
    }

}
