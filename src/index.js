import './scss/index.scss';
import Modal from './Modal';
import confirmModal from './confirm';

let fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];

const createCard = card => `
  <div class="col-md-4">
    <div class="card">
      <img class="card-img-top" style="height: 300px;" src="${card.img}">
      <div class="card-body">
        <h5 class="card-title">${card.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${card.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="delete" data-id="${card.id}">Удалить</a>
      </div>
    </div>
  </div>
`

function render() {
  const html = fruits.map(createCard).join('');
  document.querySelector('#root').innerHTML = html;
}

render();

const detailsModal = new Modal({
  title: 'Модальное окно', 
  width: '450px', 
  closable: true,
  buttons: [
    {text: 'Изменить', handler: () => console.log('Изменить')},
    {text: 'Удалить', handler: () => modal.close()},
  ]
});

document.addEventListener('click', e => {
  const type = e.target.dataset.btn;
  const fruit = fruits.find(fruit => fruit.id === Number(e.target.dataset.id));
  if (type === 'price') {
    detailsModal.setContent(`Цена на ${fruit.title}: <strong>${fruit.price}</strong>`);
    detailsModal.open();
  } else if (type === 'delete') {
    confirmModal({
      title: 'Вы уверены?',
      content: `Вы удаляете фрукт: <strong>${fruit.title}</strong>`
    }).then(() => {
      fruits = fruits.filter(f => f.id !== fruit.id);
      render();
    }).catch(e => console.log('Отмена'))
  }
})