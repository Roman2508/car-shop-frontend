export const filterKeys = {
  Категорія: 'category',
  Виробник: 'subcategory',
  'Тип автомобіля': 'carType',
  'Коробка передач': 'gearbox',
  'Тип палива': 'fuelType',
  'Тип кузова': 'carBodyType',
  'Кількість місць': 'seatsCount',
  'Тип приводу': 'driveType',
  "Об'єм двигуна": 'engineVolume',
  Колір: 'color',
  'Лакове покриття': 'varnishCoating',
  'Технічний стан': 'technicalCondition',
  Комфорт: 'comfort',
  Мультимедіа: 'multimedia',
  Безпека: 'security',
  Розмитнена: 'сustomsСleared',
  'Авто пригнано з': 'theCarWasDrivenFrom',
}

const getFilterKey = (key: keyof typeof filterKeys) => {
  if (key in filterKeys) {
    return filterKeys[key]
  }

  return ''
}

export default getFilterKey
