import { Event } from "./Event";
import { EventHandler } from "./EventHandler";

export type Events = Partial<Record<Event, EventHandler[]>>;
