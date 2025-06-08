const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      font-family: 'Inter', Arial, sans-serif;
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
  </style>
  <div id="secciones-container"></div>
`;

class Acordion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.seccionesContainer = this.shadowRoot.getElementById('secciones-container');
  }

  connectedCallback() {
    this._render();
    this._setupEventListeners();
  }

  _render() {
    this.seccionesContainer.innerHTML = '';
    const secciones = Array.from(this.querySelectorAll('[data-titulo]'));
    
    secciones.forEach((seccion, index) => {
      const titulo = seccion.getAttribute('data-titulo');
      const contenido = seccion.innerHTML;
      
      const divSeccion = document.createElement('div');
      divSeccion.className = 'seccion';
      divSeccion.id = `seccion-${index}`;
      
      divSeccion.innerHTML = `
        <div class="titulo" id="titulo-${index}">
          ${titulo}
          <span class="icono">▼</span>
        </div>
        <div class="contenido" id="contenido-${index}">${contenido}</div>
      `;
      
      this.seccionesContainer.appendChild(divSeccion);
      
      if (index === 0) {
        divSeccion.classList.add('activa');
      }
    });
  }

  _setupEventListeners() {
    this.seccionesContainer.addEventListener('click', (e) => {
      const titulo = e.target.closest('.titulo');
      if (!titulo) return;
      
      const seccion = titulo.parentElement;
      const estaActiva = seccion.classList.contains('activa');
      
      this.seccionesContainer.querySelectorAll('.seccion').forEach(s => {
        s.classList.remove('activa');
      });
      
      if (!estaActiva) {
        seccion.classList.add('activa');
      }
    });
  }

  addSeccion(titulo, contenido) {
    const newSeccion = document.createElement('div');
    newSeccion.setAttribute('data-titulo', titulo);
    newSeccion.innerHTML = contenido;
    this.appendChild(newSeccion);
    this._render();
  }
}

customElements.define('component-acordion', Acordion);