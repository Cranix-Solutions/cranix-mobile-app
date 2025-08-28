import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';


@Injectable()
export class UtilsService {

        savedUrl = ""
        double = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09']
        public okBrowser: boolean = true;
        public actMdList;
        constructor() {
                let tmp = window.navigator.userAgent
                if (tmp.indexOf("Mozilla") != -1 && tmp.indexOf("Windows") != -1) {
                        this.okBrowser = false;
                }
        }

        public hostName(): string {
                if (this.savedUrl != "") {
                        return this.savedUrl + "/api";
                }
		var url = ""
                var hostname = window.location.hostname;
                var protocol = window.location.protocol;
                var port = window.location.port;
                if (sessionStorage.getItem('shortName')) {
                        if (port) {
                                url = `${protocol}//${hostname}:${port}/${sessionStorage.getItem('shortName')}`
                        } else {
                                url = `${protocol}//${hostname}/${sessionStorage.getItem('shortName')}`
                        }
                } else if (port) {
                        url = protocol + "//" + hostname + ":" + port + "/api";
                }
                else {
                        url = protocol + "//" + hostname + "/api";
                }
                //console.log("From utils: " + url);
                //return "https://admin.cephalix.eu/api"
                return "https://gif1.bbs1-gifhorn.de:444/api"
                return "https://test-cephalix.cephalix.eu/api"
                //return "https://192.168.122.100:444/api"
                return "https://192.168.178.127:444/api"
                return url;
        }
        public log(args) {
                var dev = isDevMode();
                //console.log(dev);
                if (dev) {
                        console.log(args);
                }
        }

        public deleteCookie(name) {
                this.setCookie(name, '', -1);
        }

        /**
         * get cookie
         * @param {string} name
         * @returns {string}
         */
        public getCookie(name: string) {
                const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
                const caLen: number = ca.length;
                const cookieName = `${name}=`;
                let c: string;

                for (let i = 0; i < caLen; i += 1) {
                        c = ca[i].replace(/^\s+/g, '');
                        if (c.indexOf(cookieName) === 0) {
                                return c.substring(cookieName.length, c.length);
                        }
                }
                return '';
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
        /**
         * set cookie
         * @param {string} name
         * @param {string} value
         * @param {number} expireHours
         * @param {string} path
         */
        public setCookie(name: string, value: string, expireHours: number, path: string = '') {
                const d: Date = new Date();
                d.setTime(d.getTime() + expireHours * 60 * 60 * 1000);
                const expires = `expires=${d.toUTCString()}`;
                const cpath = path ? `; path=${path}` : '';
                document.cookie = `${name}=${value}; ${expires}${cpath}; SameSite=Lax`;
        }

        public formatFileSize(bytes: number): string {
                if (bytes === 0) return '0 Bytes';
                if (!bytes) return '';

                const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];
                const i = Math.floor(Math.log(bytes) / Math.log(1024));
                const size = bytes / Math.pow(1024, i);

                if(i == 0){
                        return `${size} ${sizes[i]}`;
                }else {
                        const formattedSize = size.toFixed(2);
                        return `${formattedSize} ${sizes[i]}`;
                }
                // Formatieren auf zwei Dezimalstellen
                 

                
        }
}

