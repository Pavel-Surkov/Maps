ymaps.ready(init);

async function init() {
  let myMap = new ymaps.Map("map", {
    center: [55.02, 82.95],
    zoom: 8,
    controls: ['fullscreenControl'],
  });

  let searchControl = new ymaps.control.SearchControl({
    options: {
        provider: 'yandex#search',
    }
  });

  await myMap.controls.add(searchControl);

  await searchControl.search('ТЭЦ');

  for(let i = 0; i < searchControl.getResultsArray().length; i++) {

    searchControl.getResult(i)
      .then(res => {
        const categories = res.properties._data.categories;
        const name = res.properties._data.name.toLowerCase();

        if(
          (
            categories.indexOf('АЭС, ГЭС, ТЭС' != -1) ||
            categories.indexOf('Энергоснабжение' != -1)
          ) && (
            name.includes('тэц') || name.includes('гэс')
          )
        ) {
          console.log(res.properties._data.address);
        }
      });
  }
  
  searchControl.getResult(0)
    .then(res => console.log(res));
  
  //c.properties._data.categories - содержит категории объекта
}