import { EventEmitter } from 'stream';
import { DomainEvent } from './interfaces/domainEvent.interface';
import { IEventQueue } from './interfaces/eventQueue.interface';
import { register } from '../../structure/register';
import { UseCase } from '../../structure/useCase';

export class EventQueue implements IEventQueue {
  private eventEmitter: EventEmitter;

  constructor() {
    this.eventEmitter = new EventEmitter();
  }

  publish(event: DomainEvent) {
    this.eventEmitter.emit(event.eventName, event);
  }
  consume(eventName: string, callbackName: string) {
    if (callbackName) {
      const callback = register.getInstance<UseCase<unknown, unknown>>(callbackName);
      this.eventEmitter.on(eventName, (data) => {
        callback.perform(data);
      });
    }
  }
}

export default new EventQueue();
