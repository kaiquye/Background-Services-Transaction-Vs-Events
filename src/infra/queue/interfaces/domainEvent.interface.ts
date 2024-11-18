export abstract class DomainEvent {
  eventName: string;
  eventDate: Date;
  constructor(eventName: string, eventDate: Date) {
    this.eventName = eventName;
    this.eventDate = eventDate;
  }
}
