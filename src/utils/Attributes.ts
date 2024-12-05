import { HasId } from "./HasId";

export class Attributes<T extends HasId> {
  private _data: T[];

  public constructor(data: T[]) {
    this._data = data;
  }

  public get data(): T[] {
    return this._data;
  }

  public set data(value: T[]) {
    this._data = value;
  }

  public getOne(id: number): T | undefined {
    return this._data.find((item) => item.id === id);
  }

  public create(newItem: T): void {
    this._data.push(newItem);
  }

  public update(id: number, updatedItem: T) {
    const existing = this._data.find((e) => e.id === id);
    if (!existing) return;
    Object.assign(existing, updatedItem);
  }

  public delete(id: number) {
    const index = this._data.findIndex((e) => e.id === id);
    if (index === -1) return;
    this._data.splice(index, 1);
  }
}
