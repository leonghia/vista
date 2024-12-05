import { UserController } from "../controllers/UserController";
import { User } from "../models/User";
import { UserCreate } from "../models/UserCreate";
import { UserGet } from "../models/UserGet";
import { UserUpdate } from "../models/UserUpdate";
import { View } from "./View";

export class UserForm extends View<
  User,
  UserGet,
  UserCreate,
  UserUpdate,
  UserController
> {
  protected _regionsMap(): Record<string, string> {
    return {};
  }
  private _onSetAgeClick(): void {
    this._entityController.setRandomAge(this._data);
  }

  private _onSetNameClick(): void {
    const input = this._parent.querySelector("input")!;
    const name = input.value;
    this._entityController.set(this._data, { age: this._data.age, name });
  }

  private async _onSaveClick(): Promise<void | never> {
    await this._entityController.update(this._data.id, {
      name: this._data.name,
      age: this._data.age,
    });
  }

  protected _template(): string {
    return `
        <div>
            <input type="text" value="${this._data.name}" />
            <button class="set-name">Change name</button>
            <button class="set-age">Set random age</button>
            <div>
              <button class="save">Save</button>
            </div>
        <div>
        `;
  }

  protected _eventsMap(): Record<string, () => void> {
    return {
      "click:.set-age": this._onSetAgeClick,
      "click:.set-name": this._onSetNameClick,
      "click:.save": this._onSaveClick,
    };
  }
}
