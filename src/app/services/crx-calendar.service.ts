import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//own modules
import { UtilsService } from './utils.service';
import { AuthenticationService } from './auth.service';
import { ServerResponse } from 'src/app/shared/models/server-models';
import { CrxCalendar } from 'src/app/shared/models/data-model';

@Injectable({
  providedIn: 'root'
})
export class CrxCalendarService {


  double = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
  hostname: string;
  modified: boolean = false;

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private authService: AuthenticationService) {
    this.hostname = this.utilsService.hostName();
  }

  add(event: CrxCalendar) {
    let url = this.hostname + "/calendar"
    console.log(url)
    return this.http.post<ServerResponse>(url, event, { headers: this.authService.headers })
  }

  modify(event: CrxCalendar) {
    let url = this.hostname + "/calendar"
    console.log(url)
    return this.http.patch<ServerResponse>(url, event, { headers: this.authService.headers })
  }

  delete(event: CrxCalendar) {
    let url = this.hostname + "/calendar/" + event.id
    console.log(url)
    return this.http.delete<ServerResponse>(url, { headers: this.authService.headers })
  }

  get() {
    let url = this.hostname + "/calendar"
    if (this.authService.isAllowed('calendar.manage')) {
      url = this.hostname + "/calendar/all"
    }
    console.log(url)
    return this.http.get<CrxCalendar[]>(url, { headers: this.authService.headers })
  }

  getFiltered(map: any) {
    let url = this.hostname + "/calendar/filter"
    console.log(url)
    return this.http.post<CrxCalendar[]>(url, map, { headers: this.authService.headers })
  }

  getById(id: string) {
    let url = this.hostname + "/calendar/" + id
    console.log(url)
    return this.http.get<CrxCalendar>(url, { headers: this.authService.headers })
  }

  importTimeTable(imp: FormData) {
    let url = this.hostname + `/calendar/import`;
    const headers = new HttpHeaders({
      'Accept': "application/json",
      'Authorization': "Bearer " + this.authService.session.token
    });
    console.log(url)
    return this.http.post<ServerResponse>(url, imp, { headers: headers });
  }
  public adaptEventTimes(event: any) {
    event.start = this.toIonISOString(new Date(event.start))
    event.end = this.toIonISOString(new Date(event.end))
  }
  public adaptPtmTimes(ptm: any) {
    ptm.start = this.toIonISOString(new Date(ptm.start))
    ptm.end = this.toIonISOString(new Date(ptm.end))
    ptm.startRegistration = this.toIonISOString(new Date(ptm.startRegistration))
    ptm.endRegistration = this.toIonISOString(new Date(ptm.endRegistration))
    return ptm
  }

  public convertPtmTimes(ptm: any) {
    ptm.start = new Date(ptm.start).valueOf().toString()
    ptm.end = new Date(ptm.end).valueOf().toString()
    ptm.startRegistration = new Date(ptm.startRegistration).valueOf().toString()
    ptm.endRegistration = new Date(ptm.endRegistration).valueOf().toString()
  }

  public formatDateKey(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  public oneHourEarlier(date: Date): Date {
    const result = new Date(date); // copy the original date
    result.setHours(result.getHours() - 1);
    return result;
  }

  public groupEventsByDate(events: any[]): any {
    const groups = {};
    for (const ev of events) {
      const startVal = ev.start;
      const dateObj = startVal instanceof Date ? startVal : new Date(startVal);
      if (isNaN(dateObj.getTime())) continue; // ungültiges Datum überspringen
      const date = this.formatDateKey(dateObj);
      const hour = dateObj.getHours()
      if (!groups[date]) {
        groups[date] = {};
      }
      if (!groups[date][hour]) {
        groups[date][hour] = []
      }
      groups[date][hour].push(ev);
    }
    return groups;
  }

  public formatTimeHHMM(d: any): string {
    const dateObj = d instanceof Date ? d : new Date(d);
    if (isNaN(dateObj.getTime())) return "";
    return `${dateObj.getHours}:${dateObj.getMinutes}`
  }

  public nextDay(end: string): string {
    const [y, m, d] = end.split("-").map(Number);
    const date = new Date(Date.UTC(y, m - 1, d + 1));
    return date.toISOString().slice(0, 10);
  }

  public getDouble(num: number) {
    if (this.double[num]) return this.double[num]
    return num
  }

  public toIonISOString(dt: Date | undefined) {
    if (dt) {
      return dt.getFullYear() + "-" +
        this.getDouble(dt.getMonth() + 1) + "-" +
        this.getDouble(dt.getDate()) + "T" +
        this.getDouble(dt.getHours()) + ":" +
        this.getDouble(dt.getMinutes())
    }
    return ""
  }

  public toIonDate(dt: Date | undefined) {
    if (dt) {
      return dt.getFullYear() + "-" +
        this.getDouble(dt.getMonth() + 1) + "-" +
        this.getDouble(dt.getDate())
    }
    return ""
  }

  public toIonTime(dt: Date | undefined) {
    if (dt) {
      return this.getDouble(dt.getHours()) + ":" +
        this.getDouble(dt.getMinutes())
    }
    return ""
  }
  
  public createCalendarFile(events: any[]): void {
    const formatDate = (date: Date) => date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  
    const eventBlocks = events.map(event => `
  BEGIN:VEVENT
  SUMMARY:${event.title}
  DTSTART:${formatDate(event.start)}
  DTEND:${formatDate(event.end)}
  LOCATION:${event.location ?? ""}
  END:VEVENT`).join("");
  
    const icsContent = `
  BEGIN:VCALENDAR
  VERSION:2.0
  ${eventBlocks}
  END:VCALENDAR
  `.trim();
  
    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = "events.ics";
    link.click();
  
    URL.revokeObjectURL(url);
  }

  public notInRange(startStr: string, endStr: string): number[] {
    const start = new Date(startStr + "T00:00:00");
    const end = new Date(endStr + "T00:00:00");
  
    const present = new Set<number>();
    const current = new Date(start);
  
    while (current <= end) {
      present.add(current.getDay()); // 0–6 (Sun–Sat)
      current.setDate(current.getDate() + 1);
    }
  
    const result: number[] = [];
  
    for (let i = 0; i <= 6; i++) {
      if (!present.has(i)) {
        result.push(i);
      }
    }
  
    return result;
  }
}
