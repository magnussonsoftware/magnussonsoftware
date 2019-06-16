import { html, LitElement } from 'https://unpkg.com/@polymer/lit-element@latest/lit-element.js?module';
import './AppChart.js'

// Extend the LitElement base class
class MyApp extends LitElement {

  /**
   * Implement `render` to define a template for your element.
   *
   * You must provide an implementation of `render` for any element
   * that uses LitElement as a base class.
   */
  render(){
    /**
     * `render` must return a lit-html `TemplateResult`.
     *
     * To create a `TemplateResult`, tag a JavaScript template literal
     * with the `html` helper function:
     */
    return html`
      <!-- template content -->
      <p>Coopers test</p>
      <app-chart></app-chart>
    `;
  }
}
// Register the new element with the browser.
customElements.define('my-app', MyApp);
