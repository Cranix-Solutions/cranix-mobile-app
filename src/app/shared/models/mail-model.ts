
/**
 * Models of the simple webmailer.
 */

export class MailFolder {
    name: string = "";
    fullName: string = "";
    type: string = "";
    messageCount: number = 0;
    unreadCount: number = 0;
}

export class MailAttachment {
    partIndex: number = 0;
    fileName: string = "";
    contentType: string = "";
    size: number = 0;
}

export class MailMessage {
    folder: string = "";
    uid: number = 0;
    messageId: string = "";
    from: string = "";
    to: string[] = [];
    cc: string[] = [];
    subject: string = "";
    date: Date;
    seen: boolean = false;
    flagged: boolean = false;
    hasAttachments: boolean = false;
    size: number = 0;
    textBody: string = "";
    htmlBody: string = "";
    attachments: MailAttachment[] = [];
}

export class MailConfig {
    mailserver: string = "";
    mailaddress: string = "";
    username: string = "";
    imapPort: string = "";
    imapSecurity: string = "";
    smtpPort: string = "";
    smtpSecurity: string = "";
    trustAll: string = "";
}
