class Clipboard {
  constructor() { this.clip = ''; }
  writeText(text) { this.clip = text; return Promise.resolve(); }
}

export default Clipboard;
