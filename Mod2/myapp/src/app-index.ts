import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      text-align: center;
      font-family: sans-serif;
    }
    h1 { color: var(--sl-color-primary-600); }
  `;

  render() {
    return html`
      <main>
        <h1>CMPS 460</h1>
        <h2>Developed by Sam Fehl</h2>
        <p>Currently running on Netlify via GitHub CD.</p>
      </main>
    `;
  }
}