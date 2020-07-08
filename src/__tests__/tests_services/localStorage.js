class LocalStorage {
  constructor(obj = {}) { this.store = obj; }
  setItem(key, value) { this.store[key] = value.toString(); }
  getItem(key) { return this.store[key]; }
  clear() { this.store = {}; }
  removeItem(key) { delete this.store[key]; }
}

export default LocalStorage;
