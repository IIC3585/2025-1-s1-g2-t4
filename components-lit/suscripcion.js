import { LitElement, css, html } from "lit";

export class Subscription extends LitElement {
    static properties = {
        plan: { type: String },
        visitas: { type: String },
        precio: { type: String },
        descripcion: { type: String },
        features: { type: String },
        best: { type: Boolean }
    }

    get featuresArray() {
        return this.features ? this.features.split(',').map(f => f.trim()).filter(f => f) : [];
    }

    static styles = css`
    :host {
      display: block;
      max-width: 320px;
      font-family: 'Inter', Arial, sans-serif;
      border: 1.5px solid #d3d3d3;
      border-radius: 14px;
      box-shadow: 0 3px 10px 0 rgba(0,0,0,0.03);
      margin: 14px;
      background: #fff;
      transition: box-shadow 0.2s;
    }
    .container {
      padding: 26px 22px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }
    .plan {
      font-size: 1.25rem;
      font-weight: bold;
      margin-bottom: 2px;
    }
    .visitas {
      color: #555;
      font-size: 1rem;
      margin-bottom: 10px;
    }
    .precio {
      font-size: 2.1rem;
      font-weight: 700;
      color: #000;
      margin-bottom: 3px;
    }
    .descripcion {
      font-size: 1rem;
      color: #555;
      margin-bottom: 15px;
    }
    .features {
      margin: 0 0 12px 0;
      padding: 0;
      list-style: none;
    }
    .features li {
      font-size: 0.98rem;
      margin: 0 0 8px 0;
      padding-left: 20px;
      position: relative;
    }
    .features li::before {
      content: '✔️';
      position: absolute;
      left: 0;
      font-size: 1rem;
      color: #43d775;
    }
    .btn {
      background: #000;
      color: #fff;
      border: none;
      border-radius: 6px;
      padding: 12px 0;
      width: 100%;
      font-size: 1.08rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.18s;
    }
    .btn:hover {
      background: #333;
    }
    .best-badge {
      background: #43d775;
      color: #fff;
      font-size: 0.9rem;
      font-weight: bold;
      border-radius: 5px;
      padding: 2px 10px;
      position: absolute;
      top: 22px;
      right: 18px;
      letter-spacing: 1px;
    }
    .container {
      position: relative;
    }
    `;

    constructor() {
        super();
        this.plan = '';
        this.visitas = '';
        this.precio = '';
        this.descripcion = '';
        this.features = "";
        this.best = false;
    }

    render() {
        return html`
            <div class="container">
                ${this.best ? html`<div class="best-badge">Best</div>` : ''}
                <div class="plan">${this.plan}</div>
                <div class="visitas">${this.visitas}</div>
                <div class="precio">${this.precio}</div>
                <div class="descripcion">${this.descripcion}</div>
                <ul class="features">
                    ${this.featuresArray.map(feature => html`<li>${feature}</li>`)}
                </ul>
                <button class="btn">Get started</button>
            </div>
        `;
    }
}

customElements.define('subscription-card', Subscription);
