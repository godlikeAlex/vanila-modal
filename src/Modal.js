export default class Modal {
  constructor(options) {
    this.title = options.title || 'Default Title';
    this.content = options.content || '';
    this.width = options.width || '400px';
    this.closable = options.closable;
    this.closing = false;
    this.destoyed = false;
    this.onClose = options.onClose;
    this.buttons = options.buttons || [];
    this.init();
  }

  _createModal() {
    const modal = document.createElement('div');
    modal.classList.add('y-modal');
    modal.insertAdjacentHTML('afterbegin', `
      <div class="y-modal-overlay" data-close="true">
        <div class="y-modal-content" style="width: ${this.width}">
          <div class="modal-header">
            <span class="title-modal">${this.title}</span>
            ${this.closable ? '<span class="close-modal" data-close="true">&times;</span>' : ''}
          </div>
          <div class="modal-body" data-content='content'>
            ${this.content}
          </div>
          ${this.buttons.length > 0 ? ' <div class="modal-footer" data-modal_footer></div>' : ''}
        </div>
      </div>
    `);
    document.body.appendChild(modal);
    return modal;
  }

  _addButtons() {
    if(this.buttons.length > 0) {
      const container = this.modal.querySelector('[data-modal_footer]');
      this.buttons.forEach(button => {
        const $btn = document.createElement('button');
        $btn.classList.add('btn');
        $btn.classList.add('btn-light');
        $btn.textContent = button.text;
        $btn.onclick = button.handler;
        container.appendChild($btn)
      })
    }
  }

  init() {
    this.modal = this._createModal();
    
    this._addButtons();

    this.listener = e => {
      if (e.target.dataset.close) this.close();
    }

    this.modal.addEventListener('click', this.listener)
  }

  open() {
    if(this.destoyed) return console.log('Modal is destoyed');
    !this.closing && this.modal.classList.add('open');
  };

  close() {
    const ANIMATION_DURATION = 200;

    this.closing = true;
    this.modal.classList.remove('open');
    this.modal.classList.add('hide');

    setInterval(() => {
      this.modal.classList.remove('hide');
      this.closing = false;
      if(typeof this.onClose === 'function') {
        this.onClose();
      }
    }, ANIMATION_DURATION);
  };

  setContent(html) {
    this.modal.querySelector('[data-content]').innerHTML = html;
  }

  destroy() {
    document.body.removeChild(this.modal);
    this.modal.removeEventListener('click', this.listener);
    this.destoyed = true;
  };
}