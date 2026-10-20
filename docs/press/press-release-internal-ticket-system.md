# Press Release

## CRANIX Mobile App Introduces an Internal Ticket System for School Help Desks

**Cranix-Solutions announces a new internal ticket system in the CRANIX Mobile App: staff and teachers report problems with devices, rooms or the building, while a help desk team picks up, assigns and works the tickets — all inside CRANIX, without any external tool.**

`[CITY], [DATE]` — Cranix-Solutions today announced the release of the **internal ticket system** in the CRANIX Mobile App (version `[VERSION]`). It turns CRANIX into a self-contained help desk: users raise issues right where they occur, and a staffed team organises and resolves them.

### One help desk, three clear roles

The system is built around three permissions, so every school can assign responsibilities without extra configuration:

- **`crxticket.use`** — create tickets, follow and reply to their own tickets. This role gets its own **Help Desk** entry in the app menu and a toolbar button.
- **`crxticket.worker`** — see all open tickets, assign them (for example to themselves) and work on them. Workers get the **Tickets** management page and a toolbar button.
- **`crxticket.manager`** — the same rights as a worker, plus access to all tickets, including those already assigned to someone else, and the right to delete tickets.

### Report what matters: device, room or building

A ticket does not have to be tied to a single object. When creating one, users can select one or more **devices** and **rooms**, or simply describe a general issue affecting the **building**. The targets are chosen from the equipment and rooms the user is allowed to see, so the report is precise from the first step.

### A conversation, not a form

Each ticket is a running conversation. The first message describes the issue; every reply is stored as an **article** with author and timestamp, and **attachments** can be added to any contribution. The status is derived from the conversation itself:

- **N** — new ticket,
- **R** — a new reply from the reporter has arrived,
- **W** — the help desk is waiting for the reporter,
- **D** — done / closed.

The reporter can close their own ticket, workers and managers can close any open ticket, and managers can delete tickets that are no longer needed.

### Where it lives in the app

The ticket system is integrated exactly where users already work:

- A **Help Desk** page for `crxticket.use` users (analogous to the Cephalix support area).
- A **Tickets** management page with a filterable list for workers and managers (analogous to the Cephalix ticket list).
- **Toolbar buttons** with live badges that show how many tickets need attention, refreshed automatically.
- **Menu entries** that appear only for the roles that are allowed to use them.

The ticket details stay in place while the conversation scrolls, the newest answer is always at the end, and a reply can be written directly in the open ticket — with an attachment if needed.

### A look that feels like a real ticket

Opened tickets use a card design inspired by classic paper tickets: a subtle perforated tear line separates the details from the conversation, with small triangular notches on the card edges. The design adapts to the CRANIX theme and stays quiet enough not to distract from the content.

### Built on a clean API

The feature is backed by the CRANIX `/crxtickets` interface with create, read, reply, assign, close, delete and status endpoints. Access follows the existing CRANIX permission model, every ticket records its creator and assignee, and the "last modified" time always reflects the most recent contribution — so every list stays accurate.

### Benefits for schools

For teachers and staff, reporting a broken device or a room problem takes seconds and happens in the tool they already use. For the IT and facility teams, all reports arrive in one queue that can be filtered, assigned and tracked to completion — without e-mails getting lost or spreadsheets drifting out of date.

### Availability

The internal ticket system is available now in the CRANIX Mobile App. It appears for users whose roles include the `crxticket.use`, `crxticket.worker` or `crxticket.manager` permission; no separate installation is required.

### About Cranix-Solutions

Cranix-Solutions develops CRANIX, a comprehensive open platform for the administration of schools and educational institutions — covering users, devices, rooms, software and much more. The CRANIX Mobile App extends this platform to smartphones and tablets as a Progressive Web App.

### Press contact

`[Name]`
`[E-Mail]`
`[Phone]`

---

## Deutsch

## CRANIX Mobile App führt ein internes Ticketsystem für den Schul-Helpdesk ein

**Cranix-Solutions stellt ein neues internes Ticketsystem in der CRANIX Mobile App vor: Beschäftigte und Lehrkräfte melden Probleme mit Geräten, Räumen oder dem Gebäude, während ein Helpdesk-Team die Tickets übernimmt, zuweist und bearbeitet — vollständig in CRANIX, ohne externes Werkzeug.**

`[ORT], [DATUM]` — Cranix-Solutions gibt die Veröffentlichung des **internen Ticketsystems** in der CRANIX Mobile App (Version `[VERSION]`) bekannt. Es macht CRANIX zu einem vollständigen Helpdesk: Nutzerinnen und Nutzer melden Anliegen genau dort, wo sie entstehen, und ein besetztes Team organisiert und löst sie.

### Ein Helpdesk, drei klare Rollen

Das System basiert auf drei Berechtigungen, sodass jede Schule Verantwortlichkeiten ohne zusätzliche Konfiguration verteilen kann:

- **`crxticket.use`** — Tickets anlegen sowie die eigenen Tickets verfolgen und beantworten. Diese Rolle erhält einen eigenen Menüeintrag **Helpdesk** und eine Schaltfläche in der Werkzeugleiste.
- **`crxticket.worker`** — alle offenen Tickets sehen, zuweisen (zum Beispiel sich selbst) und bearbeiten. Bearbeiterinnen und Bearbeiter erhalten die Verwaltungsseite **Tickets** sowie eine Schaltfläche in der Werkzeugleiste.
- **`crxticket.manager`** — dieselben Rechte wie ein Bearbeiter, zusätzlich Zugriff auf alle Tickets, auch auf bereits zugewiesene, sowie das Recht, Tickets zu löschen.

### Melden, was wichtig ist: Gerät, Raum oder Gebäude

Ein Ticket muss nicht an ein einzelnes Objekt gebunden sein. Beim Anlegen können eine oder mehrere **Geräte** und **Räume** ausgewählt oder einfach ein allgemeines Anliegen zum **Gebäude** beschrieben werden. Die Ziele stammen aus dem Geräte- und Raumbestand, den die nutzende Person sehen darf, sodass die Meldung von Anfang an präzise ist.

### Ein Gespräch statt eines Formulars

Jedes Ticket ist ein fortlaufendes Gespräch. Die erste Nachricht beschreibt das Anliegen; jede Antwort wird als **Artikel** mit Autor und Zeitstempel gespeichert, und zu jedem Beitrag können **Anhänge** hinzugefügt werden. Der Status ergibt sich aus dem Gespräch selbst:

- **N** — neues Ticket,
- **R** — eine neue Antwort der meldenden Person ist eingetroffen,
- **W** — der Helpdesk wartet auf die meldende Person,
- **D** — erledigt / geschlossen.

Die meldende Person kann ihr eigenes Ticket schließen, Bearbeiter und Manager können jedes offene Ticket schließen, und Manager können nicht mehr benötigte Tickets löschen.

### Wo es in der App zu finden ist

Das Ticketsystem ist genau dort integriert, wo bereits gearbeitet wird:

- Eine Seite **Helpdesk** für Nutzerinnen und Nutzer mit `crxticket.use` (analog zum Cephalix-Support-Bereich).
- Eine Verwaltungsseite **Tickets** mit filterbarer Liste für Bearbeiter und Manager (analog zur Cephalix-Ticketliste).
- **Schaltflächen in der Werkzeugleiste** mit aktuellen Zählern, die zeigen, wie viele Tickets Aufmerksamkeit benötigen — automatisch aktualisiert.
- **Menüeinträge**, die nur für die jeweils berechtigten Rollen erscheinen.

Die Ticketdetails bleiben stehen, während das Gespräch scrollt, die neueste Antwort steht immer am Ende, und eine Antwort kann direkt im geöffneten Ticket verfasst werden — bei Bedarf mit Anhang.

### Eine Optik wie ein echtes Ticket

Geöffnete Tickets nutzen ein Kartendesign, das an klassische Papiertickets erinnert: Eine dezente Perforationslinie trennt die Details vom Gespräch, mit kleinen dreieckigen Einkerbungen an den Kartenrändern. Das Design passt sich dem CRANIX-Theme an und bleibt so zurückhaltend, dass es nicht vom Inhalt ablenkt.

### Auf einer sauberen API aufgebaut

Die Funktion basiert auf der CRANIX-Schnittstelle `/crxtickets` mit Endpunkten zum Anlegen, Lesen, Antworten, Zuweisen, Schließen, Löschen und für den Status. Der Zugriff folgt dem bestehenden CRANIX-Berechtigungsmodell, jedes Ticket erfasst Ersteller und Bearbeiter, und die „zuletzt geändert"-Zeit entspricht immer dem jüngsten Beitrag — so bleiben alle Listen korrekt.

### Nutzen für Schulen

Für Lehrkräfte und Beschäftigte dauert die Meldung eines defekten Geräts oder eines Raumproblems nur Sekunden und geschieht im gewohnten Werkzeug. Für IT- und Haustechnik-Teams landen alle Meldungen in einer Warteschlange, die gefiltert, zugewiesen und bis zum Abschluss verfolgt werden kann — ohne verlorene E-Mails oder veraltete Tabellen.

### Verfügbarkeit

Das interne Ticketsystem ist ab sofort in der CRANIX Mobile App verfügbar. Es erscheint für Nutzerinnen und Nutzer, deren Rollen die Berechtigung `crxticket.use`, `crxticket.worker` oder `crxticket.manager` enthalten; eine separate Installation ist nicht erforderlich.

### Über Cranix-Solutions

Cranix-Solutions entwickelt CRANIX, eine umfassende offene Plattform für die Verwaltung von Schulen und Bildungseinrichtungen — von Benutzern über Geräte und Räume bis hin zu Software. Die CRANIX Mobile App erweitert diese Plattform als Progressive Web App auf Smartphones und Tablets.

### Pressekontakt

`[Name]`
`[E-Mail]`
`[Telefon]`
