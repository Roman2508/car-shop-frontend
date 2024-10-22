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
} as const

export type FilterKeysType = keyof typeof filterKeys
export type FilterValuesType = (typeof filterKeys)[keyof typeof filterKeys]

const getFilterKey = (key: FilterKeysType) => {
  if (key in filterKeys) {
    return filterKeys[key]
  } else {
    filterKeys
  }

  return ''
}

export const getFilterKeyByValue = (value: FilterValuesType): FilterKeysType => {
  return Object.entries(filterKeys).find(([key, val]) => val === value)?.[0] as FilterKeysType
}

export default getFilterKey
