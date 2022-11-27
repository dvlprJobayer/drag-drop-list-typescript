// Base Component Class
export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateEl: HTMLTemplateElement;
  hostEl: T;
  element: U;

  constructor(
    templateId: string,
    hostId: string,
    newElId: string,
    insertBegin: boolean
  ) {
    this.templateEl = <HTMLTemplateElement>document.getElementById(templateId);
    this.hostEl = <T>document.getElementById(hostId);

    const importedNode = document.importNode(this.templateEl.content, true);
    this.element = <U>importedNode.firstElementChild;
    this.element.id = newElId;

    this.attach(insertBegin);
  }

  private attach(insertBegin: boolean) {
    this.hostEl.insertAdjacentElement(
      insertBegin ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure(): void;
}
