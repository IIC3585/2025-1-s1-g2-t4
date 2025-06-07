class Suscripcion extends HTMLElement {
  static get observedAttributes() {
    return ['plan', 'visitas', 'precio', 'descripcion', 'features', 'best', 'button-text'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = document.getElementById('component-suscripcion');
    this.shadowRoot.appendChild(template.content.cloneNode(true));
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
    const buttonText = this.getAttribute('button-text') || 'Get started';

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

    this.shadowRoot.querySelector('.btn').textContent = buttonText;
  }
}

customElements.define('component-suscripcion', Suscripcion);
