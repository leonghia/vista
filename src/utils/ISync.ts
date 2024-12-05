import { EntityType } from "./EntityType";
import { HasId } from "./HasId";

export interface ISync<Entity extends HasId, EntityCreate, EntityUpdate> {
  init(type: EntityType): void;
  fetch(): Promise<Entity[] | never>;
  fetchOne(id: number): Promise<Entity | never>;
  create(dto: EntityCreate): Promise<void | never>;
  update(id: number, dto: EntityUpdate): Promise<void | never>;
  delete(id: number): Promise<void | never>;
}
