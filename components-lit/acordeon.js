import { LitElement, html, css } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

class AcordionComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      font-family: Arial, sans-serif;
    }
    .seccion {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 10px;
      overflow: hidden;
      transition: all 0.3s ease;
    }
    .titulo {
      background: #f8f9fa;
      padding: 15px;
      cursor: pointer;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .titulo:hover {
      background: #e9ecef;
    }
    .contenido {
      padding: 0 15px;
      max-height: 0;
      overflow: hidden;
      opacity: 0;
      transition: max-height 0.3s ease-out, opacity 0.3s ease-out, padding 0.3s ease-out;
    }
    .seccion.activa .contenido {
      padding: 15px;
      max-height: 1000px;
      opacity: 1;
    }
    .icono {
      transition: transform 0.3s ease;
    }
    .seccion.activa .icono {
      transform: rotate(180deg);
    }
  `;

  constructor() {
    super();
    this._items = [];
    this._activeIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();


    const secciones = Array.from(this.querySelectorAll('[data-titulo]'));
    this._items = secciones.map(seccion => ({
      titulo: seccion.getAttribute('data-titulo'),
      contenido: seccion.innerHTML
    }));


    this.innerHTML = '';

    this.requestUpdate();
  }

  _toggle(index) {
    this._activeIndex = this._activeIndex === index ? -1 : index;
    this.requestUpdate();
  }

  render() {
    return html`
      ${this._items.map((item, index) => html`
        <div class="seccion ${this._activeIndex === index ? 'activa' : ''}">
          <div class="titulo" @click=${() => this._toggle(index)}>
            ${item.titulo}
            <span class="icono">▼</span>
          </div>
          <div class="contenido">
            ${unsafeHTML(item.contenido)}
          </div>
        </div>
      `)}
    `;
  }
}

customElements.define('component-acordion', AcordionComponent);
