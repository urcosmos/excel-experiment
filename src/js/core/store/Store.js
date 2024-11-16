export default class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer;
    this.listeners = [];
    this.state = this.rootReducer({ ...initialState }, { type: '__INIT__' });
  }

  subscribe(fn) {
    this.listeners.push(fn);
    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter((listener) => {
          listener !== fn;
        });
      },
    };
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
    this.listeners.forEach((listener) => {
      listener(this.state);
    });
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}
