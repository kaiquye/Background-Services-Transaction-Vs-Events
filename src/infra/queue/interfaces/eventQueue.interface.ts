import { DomainEvent } from './domainEvent.interface';

export interface IEventQueue {
  publish(event: DomainEvent);
  consume(eventName: string, callback);
}
