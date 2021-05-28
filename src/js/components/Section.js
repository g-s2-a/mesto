//отвечает за отрисовку элементов на странице
//получает разметку через функцию-колбэк и вставляет её в контейнер.

export default class Section{
  constructor(renderer,containerSelector){
    this._renderer = renderer; //ссылка на функцию (отрисовка данных)
    this._container = document.querySelector(containerSelector); //контейнер для размещения даннных
  }

  // отрисовка всех элементов
  renderItems(items) {
    this._items = items; //данные
    this._items.forEach(item => {
      //отрисовка элемента
      if (item.owner._id != "4850d075a4bd7254674d8c5c" &&
          item.owner._id != 'a3123a967302913e1584ed29' &&
          item.owner._id != '803d279a818b38b0a49721fc' &&
          item.owner._id != 'cfdf23724be236f72daacf8a' &&
          item.owner._id != 'deaff4d1f6c98dcd1a53f1e8' &&
          item.owner._id != 'ac4481dc04955bbba2f3f0bd' &&
          item.owner._id != '13ecf220d5e9b5d717ed39ec'){ // фильтр нежелательного для детей контента
        this._renderer(item);
        //console.log(`${item.owner._id}-${item.owner.name}`);
      }
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element){
    this._container.prepend(element);
  }

  //удаляет место
  deleteItem(id){
    document.querySelector(`article[data-id='${id}']`).remove();
  }

}
