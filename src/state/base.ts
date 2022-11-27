// Listener Function Type
type Listener<T> = (items: T[]) => void;

// Base State Class
export class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
