import { Attributes } from "../utils/Attributes";
import { EntityType } from "../utils/EntityType";
import { ErrorName } from "../utils/ErrorName";
import { Eventing } from "../utils/Eventing";
import { HasId } from "../utils/HasId";
import { ISync } from "../utils/ISync";

export abstract class BaseController<
  Entity extends HasId,
  EntityGet,
  EntityCreate,
  EntityUpdate
> {
  protected _eventing: Eventing = new Eventing();
  protected _sync: ISync<Entity, EntityCreate, EntityUpdate>;
  protected _attributes: Attributes<Entity> | null = null;
  protected _entityType: EntityType;

  public constructor(
    entityType: EntityType,
    sync: ISync<Entity, EntityCreate, EntityUpdate>
  ) {
    this._entityType = entityType;
    this._sync = sync;
  }

  public async init(): Promise<void | never> {
    this._sync.init(this._entityType);
    try {
      await this._refresh();
    } catch (err) {
      console.error(err);
    }
  }

  public get on() {
    return this._eventing.on.bind(this._eventing);
  }

  public get trigger() {
    return this._eventing.trigger.bind(this._eventing);
  }

  public abstract get(): EntityGet[];
  public abstract getOne(id: number): EntityGet | undefined;

  public async create(dto: EntityCreate): Promise<void | never> {
    try {
      await this._sync.create(dto);
      await this._refresh();
      this._eventing.trigger("save");
    } catch (err) {
      let e: Error;
      if (err instanceof Error) e = err;
      else {
        e = new Error(`Cannot create ${this._entityType}`);
        e.name = ErrorName.CreateError;
      }
      console.error(e);
    }
  }

  public async update(
    id: number,
    entityUpdate: EntityUpdate
  ): Promise<void | never> {
    try {
      await this._sync.update(id, entityUpdate);
      await this._refresh();
      this._eventing.trigger("save");
    } catch (err) {
      let e: Error;
      if (err instanceof Error) e = err;
      else {
        e = new Error(`Cannot update ${this._entityType}`);
        e.name = ErrorName.UpdateError;
      }
      console.error(e);
    }
  }

  private async _refresh(): Promise<void | never> {
    try {
      const entities = await this._sync.fetch();
      if (this._attributes) this._attributes.data = entities;
      else this._attributes = new Attributes<Entity>(entities);
    } catch (err) {
      const e = new Error(`Cannot sync ${this._entityType}s`);
      e.name = ErrorName.FetchError;
      throw e;
    }
  }

  public abstract set(user: EntityGet, newData: EntityUpdate): void;
}
