import { Component, Input, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular'
import { AuthenticationService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';
import { NotesService } from 'src/app/services/notes.service';
import { CrxNote, NoteDescription, SubjectArea, User } from '../models/data-model';
import { LanguageService } from 'src/app/services/language.service';
import { GenericObjectService } from 'src/app/services/generic-object.service';
import { CrxObjectService } from 'src/app/services/crx-object-service';
import { CrxCalendarService } from 'src/app/services/crx-calendar.service';

export interface MemberGradeRow {
    user: User;
    grading: number;
    text: string;
}
@Component({
    standalone: false,
    selector: 'cranix-notes',
    templateUrl: './cranix-notes.component.html',
    styleUrl: './cranix-notes.component.css'
})
export class CranixNotesComponent implements OnInit {
    issue: string;
    isDisabled: boolean = false;
    isNoteOpen: boolean = false;
    labels = {};
    notes: CrxNote[] = []
    allNotes: CrxNote[] = []
    selectedNote: CrxNote = new CrxNote()
    subjectAreas: SubjectArea[] = []
    selectedIssue: string = "";
    absenceDate: string = "";
    absence
    noteTypes: NoteDescription[] = []
    filteredNotes: CrxNote[] = [];
    selectedType: string = 'all';
    noteTypeConfig: NoteDescription[] = [
        { type: 'all', label: 'all', icon: 'funnel' },
        { type: 'generic', label: 'generic', icon: 'clipboard', color: 'tertiary' },
        { type: 'todo', label: 'todo', icon: 'hammer', color: 'success' }
    ];
    noteTypeConfigUser: NoteDescription[] = [
        { type: 'performance', label: 'performance', icon: 'document-text', color: 'primary' },
        { type: 'grading', label: 'grading', icon: 'school', color: 'success' },
        { type: 'late', label: 'late', icon: 'time', color: 'warning' },
        { type: 'absence', label: 'unexcused', icon: 'close-circle', color: 'danger' },
        { type: 'excused-absence', label: 'excused', icon: 'checkmark-circle', color: 'tertiary' }
    ];
    noteTypeConfigGroup: NoteDescription[] = [
        { type: 'performance', label: 'performance', icon: 'document-text', color: 'primary' },
        { type: 'grading', label: 'grading', icon: 'school', color: 'success' }
    ];
    noteTypeConfigDevice: NoteDescription[] = [
        { type: 'access', label: 'access', icon: 'key', color: 'danger' }
    ];
    noteTypeConfigInstitute: NoteDescription[] = [
        { type: 'access', label: 'access', icon: 'key', color: 'danger' }
    ];

    lessonNumbers = ["0","1", "2", "3", "4", "5", "6", "7", "8","9", "10", "11", "12"];

    @Input() objectType: string
    @Input() selectedObject: any
    groupMembers: User[] = []
    memberGradeRows: MemberGradeRow[] = []
    constructor(
        public authService: AuthenticationService,
        private languageS: LanguageService,
        private noteService: NotesService,
        private groupService: GroupsService,
        private objectService: GenericObjectService,
        public crxObjectService: CrxObjectService,
        private modalController: ModalController,
        private alerController: AlertController,
        private calendarService: CrxCalendarService
    ) { }

    ngOnInit() {
        console.log("Constructor CranixNotesComponent")
        console.log(this.objectType)
        console.log(this.selectedObject)
        if(this.objectType.indexOf('user') != -1 ) {
            this.noteTypeConfig.push(...this.noteTypeConfigUser)
        }
        if(this.objectType.indexOf('group') != -1 ) {
            this.noteTypeConfig.push(...this.noteTypeConfigGroup)
        }
        if(this.objectType === 'device' ) {
            this.noteTypeConfig.push(...this.noteTypeConfigDevice)
        }
        if(this.objectType === 'institute' ) {
            this.noteTypeConfig.push(...this.noteTypeConfigInstitute)
        }
        for(let conf of this.noteTypeConfig){
            if(conf.type != 'all' ){
                this.noteTypes.push(conf)
            }
        }
        this.readData()
    }

    readData() {
        let note = new CrxNote();
        note.objectType = this.objectType
        note.objectId = this.selectedObject.id
        this.noteService.getByFilter(note).subscribe(
            (val) => {
                this.notes = val
                this.applyFilter()
            }
        )
    }
    applyFilter() {
        if (this.selectedType === 'all') {
            this.filteredNotes = [...this.notes].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        } else {
            this.filteredNotes = this.notes
                .filter(n => n.noteType === this.selectedType)
                .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        }
    }
    getTypeConfig(type: string) {
        return this.noteTypeConfig.find(c => c.type === type);
    }
    filterBy(type: string) {
        this.selectedType = type;
        this.applyFilter();
    }
    selectTeachingSubject() {
        this.subjectAreas = this.selectedNote.teachingSubject.subjectAreaList
    }

    openNote(note: CrxNote|null) {
        if (note) {
            this.selectedNote = note;
            if(note.reminder){
                this.selectedNote.reminder = this.calendarService.toIonISOString(new Date(note.reminder))
            }
        } else {
            this.selectedNote = new CrxNote();
            this.selectedNote.objectType = this.objectType
            this.selectedNote.objectId = this.selectedObject.id
        }
        this.isNoteOpen = true
    }

    saveNote() {
        if(this.isGroupGrading()) {
            this.saveGroupGradingNotes()
            return
        }
        this.isDisabled = true;
        console.log(this.selectedNote)
        this.noteService.add(this.selectedNote).subscribe(
            (val) => {
                this.objectService.responseMessage(val)
                if (val.code == "OK") {
                    this.readData()
                    this.isNoteOpen = false;
                    this.isDisabled = false
                }
            }
        )
    }

    saveGroupGradingNotes() {
        let rows = this.memberGradeRows.filter((row) => {
            return row.text.trim() != '' || (row.grading != 0 && row.grading != null)
        });
        if(rows.length == 0) {
            this.objectService.errorMessage(this.languageS.trans('No members to save'));
            return;
        }
        this.isDisabled = true;
        let toDo = rows.length;
        let done = 0;
        let ok = 0;
        let err = 0;
        for(let row of rows) {
            let note = new CrxNote();
            note.noteType = 'grading';
            note.objectType = 'user';
            note.objectId = row.user.id;
            note.title = this.selectedNote.title;
            note.teachingSubject = this.selectedNote.teachingSubject;
            note.subjectArea = this.selectedNote.subjectArea;
            note.grading = row.grading;
            note.weighting = this.selectedNote.weighting;
            note.text = row.text;
            this.noteService.add(note).subscribe(
                (val) => {
                    done++;
                    if (val.code == "OK") {
                        ok++;
                    } else {
                        err++;
                    }
                    if(done == toDo) {
                        if(err == 0) {
                            this.objectService.okMessage(`${ok} ${this.languageS.trans("notes")}`);
                        } else {
                            this.objectService.errorMessage(this.languageS.trans("An error was accoured"));
                        }
                        this.memberGradeRows = []
                        this.readData()
                        this.isNoteOpen = false;
                        this.isDisabled = false
                    }
                },
                (error) => {
                    done++;
                    err++;
                    if(done == toDo) {
                        this.objectService.errorMessage(this.languageS.trans('An error was accoured'));
                        this.readData()
                        this.isNoteOpen = false;
                        this.isDisabled = false
                    }
                }
            );
        }
    }

    closeNote() {
        this.isNoteOpen = false;
        this.selectedNote = new CrxNote()
    }

    closeNotes() {
        this.modalController.dismiss()
    }

    async deleteNote(note: CrxNote) {
        const alert = await this.alerController.create({
            header: this.languageS.trans('Confirm!'),
            subHeader: this.languageS.trans('Do you realy want to delete?'),
            message: note.title,
            buttons: [
                {
                    text: this.languageS.trans('Cancel'),
                    role: 'cancel',
                }, {
                    text: 'OK',
                    handler: () => {
                        this.objectService.requestSent();
                        var a = this.noteService.delete(note.id).subscribe({
                            next: (val) => {
                                this.objectService.responseMessage(val);
                                this.readData()
                                this.closeNote()
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
                if(!this.selectedNote.id){
                    return true;
                }
                if(this.selectedNote.creator.id == this.authService.session.userId) {
                    return true;
                }
                return this.authService.isOneOfAllowed(["note.manage","crxnote.manage"]);
            }
            default: {
             return this.authService.isOneOfAllowed(["note.manage","crxnote.manage"])
            }
        }
    }
    noteTypeLabel(note: CrxNote): string {
        switch (note.noteType) {
            case 'performance': return 'Performance Note';
            case 'grading': return `${note.teachingSubject.name} - ${note.title}`;
            case 'late': return `Late (${note.late} min)`;
            case 'unexcused-absence': return `Unexcused Absence`;
            case 'excused-absence': return `Excused Absence`;
            default: return '';
        }
    }

    noteDataPreview(note: CrxNote): string {
        switch (note.noteType) {
          case 'grading': return `${note.grading}; ${note.weighting}; ${note.title}`;
          case 'late': return `${note.absence1}; ${note.absence2}; ${note.late}`;
          case 'absence': return `${note.absence1} ${note.absence2}`;
          case 'excused-absence': return `${note.absence1} → ${note.absence2}`;
          default: return note.title;
        }
    }

    changeNoteType(event: any) {
        console.log(event)
        if(this.isGroupGrading()) {
            this.ensureGroupMembers()
        }
        if(this.selectedNote.noteType === 'late' || this.selectedNote.noteType === 'absence') {
            this.selectedNote.absence1 = new Date().toISOString().split('T')[0]
        }
        if(this.selectedNote.noteType === 'excused-absence') {
            this.selectedNote.absence1 = new Date().toISOString().split('T')[0]
            this.selectedNote.absence2 = new Date().toISOString().split('T')[0]
        }
    }

    isGroupGrading(): boolean {
        return !this.selectedNote.id && this.objectType.indexOf('group') != -1 && this.selectedNote.noteType === 'grading';
    }

    ensureGroupMembers() {
        if(this.groupMembers.length == 0) {
            this.groupService.getMembers(this.selectedObject.id).subscribe(
                (val) => {
                    this.groupMembers = val.filter(m => m.role == 'students')
                    this.initGradeRows()
                }
            )
        } else {
            this.initGradeRows()
        }
    }

    initGradeRows() {
        this.memberGradeRows = this.groupMembers.map((member) => {
            return { user: member, grading: 0, text: '' };
        });
    }
}
