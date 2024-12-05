import { UserController } from "../controllers/UserController";
import { User } from "../models/User";
import { UserCreate } from "../models/UserCreate";
import { UserGet } from "../models/UserGet";
import { UserUpdate } from "../models/UserUpdate";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View } from "./View";

export class UserEdit extends View<
  User,
  UserGet,
  UserCreate,
  UserUpdate,
  UserController
> {
  protected _regionsMap(): Record<string, string> {
    return {
      userShow: ".user-show",
      userForm: ".user-form",
    };
  }

  protected _eventsMap(): Record<string, () => void> {
    return {};
  }

  protected _template(): string {
    return `
        <div>
            <div class="user-show"></div>
            <br />
            <div class="user-form"></div>
        </div>
        `;
  }

  protected _onRender(): void {
    new UserShow(
      this._regions.userShow,
      this._data,
      this._entityController
    ).render();
    new UserForm(
      this._regions.userForm,
      this._data,
      this._entityController
    ).render();
  }
}
