import { BaseController } from "../controllers/BaseController";
import { HasId } from "../utils/HasId";

export abstract class View<
  Entity extends HasId,
  EntityGet,
  EntityCreate,
  EntityUpdate,
  EntityController extends BaseController<
    Entity,
    EntityGet,
    EntityCreate,
    EntityUpdate
  >
> {
  protected _parent: Element;
  protected _data: EntityGet;
  protected _entityController: EntityController;
  protected _regions: Record<string, Element> = {};

  public constructor(
    parent: Element,
    data: EntityGet,
    entityController: EntityController
  ) {
    this._parent = parent;
    this._data = data;
    this._entityController = entityController;
    this._register();
  }

  protected _register(): void {
    this._entityController.on("change", () => {
      this.render();
    });
  }

  protected _bindEvents(fragment: DocumentFragment): void {
    const that = this;
    const eventsMap = this._eventsMap();
    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      fragment.querySelectorAll(selector).forEach((el) => {
        el.addEventListener(eventName, eventsMap[eventKey].bind(that));
      });
    }
  }

  protected _mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this._regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector);
      if (element) this._regions[key] = element;
    }
  }

  public render(): void {
    this._parent.innerHTML = "";
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this._template();
    this._bindEvents(templateElement.content);
    this._mapRegions(templateElement.content);

    this._onRender();

    this._parent.append(templateElement.content);
  }

  protected abstract _regionsMap(): Record<string, string>;

  protected abstract _eventsMap(): Record<string, () => void>;

  protected abstract _template(): string;

  protected _onRender() {}
}
