import { HasId } from "../utils/HasId";

export class User implements HasId {
  public constructor(
    public id: number,
    public name: string,
    public age: number
  ) {}
}
