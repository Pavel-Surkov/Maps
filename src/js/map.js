ymaps.ready(init);

function init(){
  let myMap = new ymaps.Map("map", {
    center: [55.00, 83.00],
    zoom: 10
  });

  ymaps.geocode('Новосибирск', {
    results: 1
  }).then(function(res) {
    let firstGeoObject = res.geoObjects.get(0),
      coords = firstGeoObject.geometry.getCoordinates(),
      bounds = firstGeoObject.properties.get('boundedBy');

    firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
    firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
    
    myMap.geoObjects.add(firstGeoObject);
    myMap.setBounds(bounds, {
      checkZoomRange: true
    });

    console.log('Все данные геообъекта: ', firstGeoObject.properties.getAll());

    console.log('Метаданные ответа геокодера: ', res.metaData);

    console.log('Метаданные геокодера: ', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData'));

    console.log('precision', firstGeoObject.properties.get('metaDataProperty.GeocoderMetaData.precision'));
    /**
     * Все методы в разделе "Прямое геокодирование: "
     * @see https://yandex.ru/dev/maps/jsbox/2.1/direct_geocode
     */
  })
}