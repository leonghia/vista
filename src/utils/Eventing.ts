import { EventHandler } from "./EventHandler";
import { Event } from "./Event";
import { Events } from "./Events";

export class Eventing {
  private _events: Events = {};

  public trigger(event: Event): void {
    const handlers = this._events[event];
    if (!handlers || handlers.length === 0) return;

    handlers.forEach((handler) => handler());
  }

  public on(event: Event, handler: EventHandler): void {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(handler);
  }
}
