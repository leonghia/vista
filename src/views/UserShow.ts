import { View } from "./View";
import { User } from "../models/User";
import { UserGet } from "../models/UserGet";
import { UserCreate } from "../models/UserCreate";
import { UserUpdate } from "../models/UserUpdate";
import { UserController } from "../controllers/UserController";

export class UserShow extends View<
  User,
  UserGet,
  UserCreate,
  UserUpdate,
  UserController
> {
  protected _regionsMap(): Record<string, string> {
    return {};
  }
  protected _eventsMap(): Record<string, () => void> {
    return {};
  }
  protected _template(): string {
    return `
    <div>
        <h1>User detail</h1>
        <div>Name: ${this._data.name}</div>
        <div>Age: ${this._data.age}</div>
    </div>
    `;
  }
}
