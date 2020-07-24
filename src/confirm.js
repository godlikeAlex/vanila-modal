import Modal from './Modal';

const confirmModal = (options) => {
  return new Promise((resolve, reject) => {
    const modal = new Modal({
      title: options.title,
      width: '350px',
      closable: false,
      content: options.content,
      onClose: () => {
        modal.destroy();
      },
      buttons: [
          {text: 'Удалить', handler: () => {
            modal.close();
            resolve();
          }},
          {text: 'Отмена', handler: () => {
            modal.close();
            reject();
          }},
      ]
    });

    setTimeout(() => {
      modal.open();
    }, 100);
  })
}

export default confirmModal;