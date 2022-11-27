import Component from "./base";
import AutoBind from "../decorators/autobind";
import { Validate, validateFn } from "../util/validation";
import { projectState } from "../state/project";

// Project Input Class
export default class ProjectInput extends Component<
  HTMLDivElement,
  HTMLFormElement
> {
  titleEl: HTMLInputElement;
  descriptionEl: HTMLInputElement;
  peopleEl: HTMLInputElement;

  constructor() {
    super("project-input", "app", "user-input", true);
    this.titleEl = <HTMLInputElement>this.element.querySelector("#title");
    this.descriptionEl = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleEl = <HTMLInputElement>this.element.querySelector("#people");

    this.configure();
  }

  private getUserInput(): [string, string, number] | void {
    const titleVal = this.titleEl.value;
    const descriptionVal = this.descriptionEl.value;
    const peopleVal = +this.peopleEl.value;

    const titleValidate: Validate = {
      value: titleVal,
      required: true,
    };
    const descriptionValidate: Validate = {
      value: descriptionVal,
      required: true,
      minLength: 5,
    };
    const peopleValidate: Validate = {
      value: peopleVal,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !validateFn(titleValidate) ||
      !validateFn(descriptionValidate) ||
      !validateFn(peopleValidate)
    ) {
      alert("Invalid Input, Please try again");
      return;
    } else {
      return [titleVal, descriptionVal, peopleVal];
    }
  }

  private clearInputs() {
    this.titleEl.value = "";
    this.descriptionEl.value = "";
    this.peopleEl.value = "";
  }

  @AutoBind
  private submitHandler(event: SubmitEvent) {
    event.preventDefault();
    const userInput = this.getUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
