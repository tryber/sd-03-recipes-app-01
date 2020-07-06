class LocalStorage {
  constructor() { this.store = {}; }
  getItem(key) { return this.store[key]; }
  setItem(key, value) { this.store[key] = value.toString(); }
  clear() { this.store = {}; }
}

export default LocalStorage;
