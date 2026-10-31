// Home Connect Card – Platzhalter (Version 0.0.1). Die erste Testversion folgt.
class HomeConnectCard extends HTMLElement {
  setConfig(c) { this._c = c || {}; }
  set hass(h) {
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = '<ha-card style="padding:16px">Home Connect Card – wird gerade gebaut …</ha-card>';
  }
  getCardSize() { return 1; }
}
customElements.define("home-connect-card", HomeConnectCard);
