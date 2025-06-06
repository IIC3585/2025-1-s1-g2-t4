const template = document.createElement('template');
template.innerHTML = `
  <style>
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
  </style>
  <div class="container">
    <div class="best-badge" style="display:none;">Best</div>
    <div class="plan"></div>
    <div class="visitas"></div>
    <div class="precio"></div>
    <div class="descripcion"></div>
    <ul class="features"></ul>
    <button class="btn">Get started</button>
  </div>
`;

class Suscripcion extends HTMLElement {
  static get observedAttributes() {
    return ['plan', 'visitas', 'precio', 'descripcion', 'features', 'best'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._render();
    this.shadowRoot.querySelector('.btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('suscrito', {
        bubbles: true,
        composed: true,
        detail: {
          plan: this.getAttribute('plan'),
          precio: this.getAttribute('precio')
        }
      }));
    });
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    const plan = this.getAttribute('plan') || '';
    const visitas = this.getAttribute('visitas') || '';
    const precio = this.getAttribute('precio') || '';
    const descripcion = this.getAttribute('descripcion') || '';
    const features = (this.getAttribute('features') || '').split(',').map(f => f.trim()).filter(f => f);
    const best = this.hasAttribute('best');

    this.shadowRoot.querySelector('.plan').textContent = plan;
    this.shadowRoot.querySelector('.visitas').textContent = visitas;
    this.shadowRoot.querySelector('.precio').textContent = precio + (precio ? ' / mes' : '');
    this.shadowRoot.querySelector('.descripcion').textContent = descripcion;

    const ul = this.shadowRoot.querySelector('.features');
    ul.innerHTML = '';
    features.forEach(feat => {
      const li = document.createElement('li');
      li.textContent = feat;
      ul.appendChild(li);
    });

    const badge = this.shadowRoot.querySelector('.best-badge');
    badge.style.display = best ? 'block' : 'none';
  }
}

customElements.define('component-suscripcion', Suscripcion);
