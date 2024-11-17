import { debounce } from './utils';

export default class StateProcessor {
  constructor(client, delay = 500) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  listen(state) {
    this.client.save(state);
  }

  async get() {
    return this.client.get();
  }
}
