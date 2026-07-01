import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/auth.service';
import { NoticesService } from 'src/app/services/notices.service';
import { CrxNotice, SubjectArea } from '../models/data-model';
import { LanguageService } from 'src/app/services/language.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
@Component({
    standalone: false,
    selector: 'cranix-notices',
    templateUrl: './cranix-notices.component.html',
    styleUrl: './cranix-notices.component.css'
})
export class CranixNoticesComponent implements OnInit {
    issue: string;
    isDisabled: boolean = false;
    isNoticeOpen: boolean = false;
    labels = {};
    notices: CrxNotice[] = []
    allNotices: CrxNotice[] = []
    selectedNotice: CrxNotice = new CrxNotice()
    subjectAreas: SubjectArea[] = []
    selectedIssue: string = "";
    absenceDate: string = "";
    absence
    noticeTypes = []
    filteredNotices: CrxNotice[] = [];
    selectedType: string = 'all';
    noticeTypeConfig = [];
    noticeTypeConfigUser = [
        { type: 'all', label: 'all', icon: 'funnel' },
        { type: 'performance', label: 'performance', icon: 'document-text', color: 'primary' },
        { type: 'grading', label: 'grading', icon: 'school', color: 'success' },
        { type: 'late', label: 'late', icon: 'time', color: 'warning' },
        { type: 'absence', label: 'unexcused', icon: 'close-circle', color: 'danger' },
        { type: 'excused-absence', label: 'excused', icon: 'checkmark-circle', color: 'tertiary' },
    ];
    noticeTypeConfigGroup = [
        { type: 'all', label: 'all', icon: 'funnel' },
        { type: 'performance', label: 'performance', icon: 'document-text', color: 'primary' },
        { type: 'todo', label: 'todo', icon: 'hammer', color: 'success' }
    ];

    lessonNumbers = ["0","1", "2", "3", "4", "5", "6", "7", "8","9", "10", "11", "12"];

    @Input() objectType: string
    @Input() selectedObject: any
    constructor(
        public authService: AuthenticationService,
        private languageS: LanguageService,
        private noticeService: NoticesService,
        private objectService: GenericObjectService,
        public crxObjectService: CrxObjectService,
        private modalController: ModalController,
        private alerController: AlertController,
    ) { }

    ngOnInit() {
        console.log("Constructor CranixNoticesComponent")
        console.log(this.objectType)
        console.log(this.selectedObject)
        if(this.objectType.indexOf('user') != -1 ) {
            this.noticeTypeConfig = this.noticeTypeConfigUser
        }
        if(this.objectType.indexOf('group') != -1 ) {
            this.noticeTypeConfig = this.noticeTypeConfigGroup
        }
        for(let conf of this.noticeTypeConfig){
            if(conf.type != 'all' ){
                this.noticeTypes.push(conf)
            }
        }
        this.readData()
    }

    readData() {
        let notice = new CrxNotice();
        notice.objectType = this.objectType
        notice.objectId = this.selectedObject.id
        this.noticeService.getByFilter(notice).subscribe(
            (val) => {
                this.notices = val
                this.applyFilter()
            }
        )
    }
    applyFilter() {
        if (this.selectedType === 'all') {
            this.filteredNotices = [...this.notices].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        } else {
            this.filteredNotices = this.notices
                .filter(n => n.noticeType === this.selectedType)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        }
    }
    getTypeConfig(type: string) {
        return this.noticeTypeConfig.find(c => c.type === type);
    }
    filterBy(type: string) {
        this.selectedType = type;
        this.applyFilter();
    }
    selectTeachingSubject() {
        this.subjectAreas = this.selectedNotice.teachingSubject.subjectAreaList
    }

    openNotice(notice: CrxNotice) {
        if (notice) {
            this.selectedNotice = notice;
        } else {
            this.selectedNotice = new CrxNotice();
            this.selectedNotice.objectType = this.objectType
            this.selectedNotice.objectId = this.selectedObject.id
        }
        this.isNoticeOpen = true
    }

    saveNotice() {
        this.isDisabled = true;
        console.log(this.selectedNotice)
        this.noticeService.add(this.selectedNotice).subscribe(
            (val) => {
                this.objectService.responseMessage(val)
                if (val.code == "OK") {
                    this.readData()
                    this.isNoticeOpen = false;
                    this.isDisabled = false
                }
            }
        )
    }

    closeNotice() {
        this.isNoticeOpen = false;
        this.selectedNotice = new CrxNotice()
    }

    closeNotices() {
        this.modalController.dismiss()
    }

    async deleteNotice(notice: CrxNotice) {
        const alert = await this.alerController.create({
            header: this.languageS.trans('Confirm!'),
            subHeader: this.languageS.trans('Do you realy want to delete?'),
            message: notice.title,
            buttons: [
                {
                    text: this.languageS.trans('Cancel'),
                    role: 'cancel',
                }, {
                    text: 'OK',
                    handler: () => {
                        this.objectService.requestSent();
                        var a = this.noticeService.delete(notice.id).subscribe({
                            next: (val) => {
                                this.objectService.responseMessage(val);
                                this.readData()
                                this.closeNotice()
                            },
                            error: (err) => {
                                this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
                            },
                            complete: () => { a.unsubscribe() }
                        })
                    }
                }
            ]
        });
        await alert.present();
    }


    editAllowed() {
        switch(this.authService.session.role) {
            case "sysadmins": { return true; }
            case "students": { return false; }
            case "teachers": {
                if(!this.selectedNotice.id){
                    return true;
                }
                if(this.selectedNotice.creator.id == this.authService.session.userId) {
                    return true;
                }
                return this.authService.isAllowed("notice.manage");
            }
            default: {
             return this.authService.isAllowed("notice.manage")
            }
        }
    }
    noticeTypeLabel(notice: CrxNotice): string {
        switch (notice.noticeType) {
            case 'performance': return 'Performance Note';
            case 'grading': return `${notice.teachingSubject.name} - ${notice.title}`;
            case 'late': return `Late (${notice.late} min)`;
            case 'unexcused-absence': return `Unexcused Absence`;
            case 'excused-absence': return `Excused Absence`;
            default: return '';
        }
    }

    noticeDataPreview(notice: CrxNotice): string {
        switch (notice.noticeType) {
          case 'performance': return notice.title;
          case 'grading': return `${notice.grading}  ${notice.weighting}`;
          case 'late': return `${notice.absence1} ${notice.absence2} ${notice.late}`;
          case 'absence': return `${notice.absence1} ${notice.absence2}`;
          case 'excused-absence': return `${notice.absence1} → ${notice.absence2}`;
          default: return '';
        }
    }

    changeNoticeType(event: any) {
        console.log(event)
        if(this.selectedNotice.noticeType === 'late' || this.selectedNotice.noticeType === 'absence') {
            this.selectedNotice.absence1 = new Date().toISOString().split('T')[0]
        }
        if(this.selectedNotice.noticeType === 'excused-absence') {
            this.selectedNotice.absence1 = new Date().toISOString().split('T')[0]
            this.selectedNotice.absence2 = new Date().toISOString().split('T')[0]
        }
    }
}
