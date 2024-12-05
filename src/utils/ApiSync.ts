import axios from "axios";
import { HasId } from "./HasId";
import { ISync } from "./ISync";
import { EntityType } from "./EntityType";

export class ApiSync<Entity extends HasId, EntityCreate, EntityUpdate>
  implements ISync<Entity, EntityCreate, EntityUpdate>
{
  private _apiUrl: string;
  private _route: string | null = null;

  public constructor(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  public init(type: EntityType): void {
    this._route = type + "s";
  }

  public async fetch(): Promise<Entity[] | never> {
    try {
      const res: axios.AxiosResponse<Entity[]> = await axios.get(
        `${this._apiUrl}/${this._route}`
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  public async fetchOne(id: number): Promise<Entity | never> {
    try {
      const res: axios.AxiosResponse<Entity> = await axios.get(
        `${this._apiUrl}/${this._route}/${id}`
      );
      return res.data;
    } catch (err) {
      throw err;
    }
  }

  public async create(dto: EntityCreate): Promise<void | never> {
    try {
      await axios.post(`${this._apiUrl}/${this._route}`, dto);
    } catch (err) {
      throw err;
    }
  }

  public async update(id: number, dto: EntityUpdate): Promise<void | never> {
    try {
      await axios.put(`${this._apiUrl}/${this._route}/${id}`, dto);
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void | never> {
    try {
      await axios.delete(`${this._apiUrl}/${this._route}/${id}`);
    } catch (err) {
      throw err;
    }
  }
}
