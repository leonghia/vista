import { User } from "../models/User";
import { UserCreate } from "../models/UserCreate";
import { UserUpdate } from "../models/UserUpdate";
import { UserGet } from "../models/UserGet";
import { BaseController } from "./BaseController";
import { ISync } from "../utils/ISync";

export class UserController extends BaseController<
  User,
  UserGet,
  UserCreate,
  UserUpdate
> {
  public constructor(sync: ISync<User, UserCreate, UserUpdate>) {
    super("user", sync);
  }

  public get(): UserGet[] {
    return this._attributes!.data.map(
      (user: User): UserGet => ({ id: user.id, name: user.name, age: user.age })
    );
  }

  public getOne(id: number): UserGet | undefined {
    const user = this._attributes!.data.find((user) => user.id === id);
    if (!user) return user;
    const userToReturn: UserGet = {
      id: user.id,
      name: user.name,
      age: user.age,
    };
    return userToReturn;
  }

  public setRandomAge(user: UserGet): void {
    const newAge = Math.round(Math.random() * 100);
    this.set(user, { name: user.name, age: newAge });
  }

  public set(user: UserGet, newData: UserUpdate) {
    user.age = newData.age;
    user.name = newData.name;
    this.trigger("change");
  }
}
