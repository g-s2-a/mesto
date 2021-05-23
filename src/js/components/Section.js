//отвечает за отрисовку элементов на странице
//получает разметку через функцию-колбэк и вставляет её в контейнер.

export default class Section{
  constructor({items,renderer},containerSelector){
    this._items = items; //данные
    this._renderer = renderer; //ссылка на функцию (отрисовка данных)
    this._container = document.querySelector(containerSelector); //контейнер для размещения даннных
  }

  // отрисовка всех элементов
  renderItems() {
    this._items.forEach(item => {
      //отрисовка элемента
      this._renderer(item);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element){
    this._container.prepend(element);
  }
}
