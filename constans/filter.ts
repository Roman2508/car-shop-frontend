import { IFilter } from '@/redux/filter/FilterTypes'
import { IFilterCheckboxItem } from '@/types/catalog'

// Категорія
export const category = [
  { checked: false, id: '1', title: 'Легкові автомобілі' },
  { checked: false, id: '2', title: 'Вантажні автомобілі' },
  { checked: false, id: '3', title: 'Автобуси' },
  { checked: false, id: '4', title: 'Мото' },
  { checked: false, id: '5', title: 'Інший транспорт' },
]

// Виробник
export const subcategory = [
  { checked: false, id: '1', title: 'Acura' },
  { checked: false, id: '2', title: 'Alfa Romeo' },
  { checked: false, id: '3', title: 'Aston Martin' },
  { checked: false, id: '4', title: 'Audi' },
  { checked: false, id: '5', title: 'Bentley' },
  { checked: false, id: '6', title: 'BMW' },
  { checked: false, id: '7', title: 'Buick' },
  { checked: false, id: '8', title: 'Cadillac' },
  { checked: false, id: '9', title: 'Chana' },
  { checked: false, id: '10', title: 'Chery' },
  { checked: false, id: '11', title: 'Chevrolet' },
  { checked: false, id: '12', title: 'Chrysler' },
  { checked: false, id: '13', title: 'Citroen' },
  { checked: false, id: '14', title: 'Dacia' },
  { checked: false, id: '15', title: 'Daewoo' },
  { checked: false, id: '16', title: 'Dodge' },
  { checked: false, id: '17', title: 'Ferrari' },
  { checked: false, id: '18', title: 'Fiat' },
  { checked: false, id: '19', title: 'Ford' },
  { checked: false, id: '20', title: 'Geely' },
  { checked: false, id: '21', title: 'Honda' },
  { checked: false, id: '22', title: 'Hummer' },
  { checked: false, id: '23', title: 'Huyndai' },
  { checked: false, id: '24', title: 'Infinity' },
  { checked: false, id: '25', title: 'Jaguar' },
  { checked: false, id: '26', title: 'Jeep' },
  { checked: false, id: '27', title: 'Kia' },
  { checked: false, id: '28', title: 'Lamborghini' },
  { checked: false, id: '29', title: 'Land Rover' },
  { checked: false, id: '30', title: 'Lexus' },
  { checked: false, id: '31', title: 'Lifan' },
  { checked: false, id: '32', title: 'Lincoln' },
  { checked: false, id: '33', title: 'Maserati' },
  { checked: false, id: '34', title: 'Maybach' },
  { checked: false, id: '35', title: 'Mazda' },
  { checked: false, id: '36', title: 'McLaren' },
  { checked: false, id: '37', title: 'Mercedes-Menz' },
  { checked: false, id: '38', title: 'Mitsubishi' },
  { checked: false, id: '39', title: 'Nissan' },
  { checked: false, id: '40', title: 'Opel' },
  { checked: false, id: '41', title: 'Peugeot' },
  { checked: false, id: '42', title: 'Porsche' },
  { checked: false, id: '43', title: 'Renault' },
  { checked: false, id: '44', title: 'Rolls-Royse' },
  { checked: false, id: '45', title: 'Rover' },
  { checked: false, id: '46', title: 'Skoda' },
  { checked: false, id: '47', title: 'Subaru' },
  { checked: false, id: '48', title: 'Suzuki' },
  { checked: false, id: '49', title: 'Tesla' },
  { checked: false, id: '50', title: 'Toyota' },
  { checked: false, id: '51', title: 'Volkswagen' },
  { checked: false, id: '52', title: 'Volvo' },
  { checked: false, id: '53', title: 'Інші' },
]

// Тип автомобіля
export const carType = [
  { checked: false, id: '1', title: 'З пробігом' },
  { checked: false, id: '2', title: 'Новий' },
  { checked: false, id: '3', title: 'Під пригон (авто не в Україні)' },
]

// Коробка передач
export const gearbox = [
  { checked: false, id: '1', title: 'Механічна' },
  { checked: false, id: '2', title: 'Автоматична' },
  { checked: false, id: '3', title: 'Варіатор' },
  { checked: false, id: '4', title: 'Адаптивна' },
  { checked: false, id: '5', title: 'Типтронік' },
]

// Тип палива
export const fuelType = [
  { checked: false, id: '1', title: 'Бензин' },
  { checked: false, id: '2', title: 'Дизель' },
  { checked: false, id: '3', title: 'Газ / бензин' },
  { checked: false, id: '4', title: 'Електро' },
  { checked: false, id: '5', title: 'Гібрид' },
  { checked: false, id: '6', title: 'Інший' },
]

// Тип кузова
export const carBodyType = [
  { checked: false, id: '1', title: 'Кабріолет' },
  { checked: false, id: '2', title: 'Пікап' },
  { checked: false, id: '3', title: 'Купе' },
  { checked: false, id: '4', title: 'Універсал' },
  { checked: false, id: '5', title: 'Хетчбек' },
  { checked: false, id: '6', title: 'Мінівен' },
  { checked: false, id: '7', title: 'Позашляховик / Кроссовер' },
  { checked: false, id: '8', title: 'Седан' },
  { checked: false, id: '9', title: 'Ліфтбек' },
  { checked: false, id: '10', title: 'Лімузин' },
  { checked: false, id: '11', title: 'Інший' },
]

// Кількість місць
export const seatsCount = [
  { checked: false, id: '1', title: '2' },
  { checked: false, id: '2', title: '3' },
  { checked: false, id: '3', title: '4' },
  { checked: false, id: '4', title: '5' },
  { checked: false, id: '5', title: '6' },
  { checked: false, id: '6', title: '7' },
  { checked: false, id: '7', title: '8 і більше' },
]

// Тип приводу
export const driveType = [
  { checked: false, id: '1', title: 'Повний' },
  { checked: false, id: '2', title: 'Передній' },
  { checked: false, id: '3', title: 'Задній' },
]

// Об'єм двигуна
export const engineVolume = [
  { checked: false, id: '1', title: '1 л.' },
  { checked: false, id: '2', title: '2 л.' },
  { checked: false, id: '3', title: '3 л.' },
  { checked: false, id: '4', title: '5 л.' },
  { checked: false, id: '5', title: '7 л.' },
]

// Колір
export const color = [
  { checked: false, id: '1', title: 'Білий' },
  { checked: false, id: '2', title: 'Чорний' },
  { checked: false, id: '3', title: 'Синій' },
  { checked: false, id: '4', title: 'Сірий' },
  { checked: false, id: '5', title: 'Сріблястий' },
  { checked: false, id: '6', title: 'Червоний' },
  { checked: false, id: '7', title: 'Зелений' },
  { checked: false, id: '8', title: 'Бежевий' },
  { checked: false, id: '9', title: 'Бірюзовий' },
  { checked: false, id: '10', title: 'Бронзовий' },
  { checked: false, id: '11', title: 'Вишневий' },
  { checked: false, id: '12', title: 'Блакитний' },
  { checked: false, id: '13', title: 'Жовтий' },
  { checked: false, id: '14', title: 'Золотистий' },
  { checked: false, id: '15', title: 'Коричневий' },
  { checked: false, id: '16', title: 'Матовий' },
  { checked: false, id: '17', title: 'Оливковий' },
  { checked: false, id: '18', title: 'Рожевий' },
  { checked: false, id: '19', title: 'Фіолетовий' },
  { checked: false, id: '20', title: 'Інший' },
] as unknown as IFilterCheckboxItem[]

// Лакофарбове покриття
export const varnishCoating = [
  { checked: false, id: '1', title: 'Як нове, без видимих слідів експлуатації' },
  { checked: false, id: '2', title: 'Професійно відремонтоварі сліди експлуатації' },
  { checked: false, id: '3', title: 'Незначні сліди експлуатації (дрібні подряпини, сколи)' },
  { checked: false, id: '4', title: "Не відремонтовані сліди експлуатації (подряпини, вм'ятини і т.д.)" },
  { checked: false, id: '5', title: 'Потрібно відновлення (фарбування, заміна деталей, зварювання)' },
] as unknown as IFilterCheckboxItem[]

// Технічний стан
export const technicalCondition = [
  { checked: false, id: '1', title: 'На ходу, технічно справна' },
  { checked: false, id: '2', title: 'Не бита' },
  { checked: false, id: '3', title: 'Не пофарбована' },
  { checked: false, id: '4', title: 'Гаражне зберігання' },
  { checked: false, id: '5', title: 'Перший власник' },
  { checked: false, id: '6', title: 'Сервісна книжка' },
  { checked: false, id: '7', title: 'Потребує кузовного ремонту' },
  { checked: false, id: '8', title: 'Потребує ремонту ходової' },
  { checked: false, id: '9', title: 'Потребує ремонту двигуна' },
  { checked: false, id: '10', title: 'Після ДТП' },
  { checked: false, id: '11', title: 'Не на ходу' },
] as unknown as IFilterCheckboxItem[]

// Комфорт
export const comfort = [
  { checked: false, id: '1', title: 'Електропакет' },
  { checked: false, id: '2', title: 'Електросклопідйомники' },
  { checked: false, id: '3', title: 'Кондиціонер' },
  { checked: false, id: '4', title: 'Парктроник' },
  { checked: false, id: '5', title: "Бортовий комп'ютер" },
  { checked: false, id: '6', title: 'Датчик світла' },
  { checked: false, id: '7', title: 'Запуск кнопкою' },
  { checked: false, id: '8', title: 'Клімат контроль' },
  { checked: false, id: '9', title: 'Шкіряний салон' },
  { checked: false, id: '10', title: 'Круїз контроль' },
  { checked: false, id: '11', title: 'Люк' },
  { checked: false, id: '12', title: 'Панорамний дах' },
  { checked: false, id: '13', title: 'Ел. регулювання сидінь' },
  { checked: false, id: '14', title: 'Камера заднього виду' },
  { checked: false, id: '15', title: 'Передня камера' },
  { checked: false, id: '16', title: 'Мультируль' },
  { checked: false, id: '17', title: 'Омивач фар' },
  { checked: false, id: '18', title: 'Підігрів дзеркал' },
  { checked: false, id: '19', title: 'Обігрів керма' },
  { checked: false, id: '20', title: 'Підсилювач керма' },
  { checked: false, id: '21', title: 'Підігрів сидінь' },
  { checked: false, id: '22', title: 'Тонування скла' },
  { checked: false, id: '23', title: "Пам'ять сидінь" },
  { checked: false, id: '24', title: 'Датчик дощу' },
  { checked: false, id: '25', title: 'Алькантара' },
] as unknown as IFilterCheckboxItem[]

// Мультимедіа (
export const multimedia = [
  { checked: false, id: '1', title: 'CD' },
  { checked: false, id: '2', title: 'AUX' },
  { checked: false, id: '3', title: 'Bluetooth' },
  { checked: false, id: '4', title: 'USB' },
  { checked: false, id: '5', title: 'Акустика' },
  { checked: false, id: '6', title: 'Магнітола' },
  { checked: false, id: '7', title: 'Підсилювач' },
  { checked: false, id: '8', title: 'Сабвуфер' },
  { checked: false, id: '9', title: 'Система навігації GPS' },
  { checked: false, id: '10', title: 'Apple CarPay' },
  { checked: false, id: '11', title: 'Android Auto' },
]

// Безпека
export const security = [
  { checked: false, id: '1', title: 'ABD' },
  { checked: false, id: '2', title: 'ABS' },
  { checked: false, id: '3', title: 'ESP' },
  { checked: false, id: '4', title: 'Броньований автомобіль' },
  { checked: false, id: '5', title: 'Галогенні фари' },
  { checked: false, id: '6', title: 'Замок на КПП' },
  { checked: false, id: '7', title: 'Іммобілайзер' },
  { checked: false, id: '8', title: 'Пневмопідвіска' },
  { checked: false, id: '9', title: 'Подушка безпеки (Airbag)' },
  { checked: false, id: '10', title: 'Сервокермо' },
  { checked: false, id: '11', title: 'Сигналізація' },
  { checked: false, id: '12', title: 'Центральний замок' },
  { checked: false, id: '13', title: 'LED фари' },
  { checked: false, id: '14', title: 'Лазерні фари' },
  { checked: false, id: '15', title: 'Кснон' },
  { checked: false, id: '16', title: 'Денні ходові вогні' },
  { checked: false, id: '17', title: 'GPS трекер' },
  { checked: false, id: '18', title: 'Безключовий доступ' },
]

// Розмитнена
export const сustomsСleared = [
  { checked: false, id: '1', title: 'Так' },
  { checked: false, id: '2', title: 'Ні' },
  { checked: false, id: '3', title: 'Розмитнення "під ключ"' },
]

// Авто пригнано з
export const theCarWasDrivenFrom = [
  { checked: false, id: '1', title: 'США' },
  { checked: false, id: '2', title: 'Німеччина' },
  { checked: false, id: '3', title: 'Литва' },
  { checked: false, id: '4', title: 'Грузія' },
  { checked: false, id: '5', title: 'Корея' },
  { checked: false, id: '6', title: 'Польша' },
  { checked: false, id: '7', title: 'Швейцарія' },
  { checked: false, id: '8', title: 'Норвегія' },
  { checked: false, id: '9', title: 'Франція' },
  { checked: false, id: '10', title: 'Молдова' },
  { checked: false, id: '11', title: 'Іспанія' },
  { checked: false, id: '12', title: 'Італія' },
  { checked: false, id: '13', title: 'Португалія' },
  { checked: false, id: '14', title: 'Нідерланди' },
  { checked: false, id: '15', title: 'Бельгія' },
  { checked: false, id: '16', title: 'Латвія' },
  { checked: false, id: '17', title: 'Інша країна' },
]

export const filters = [
  { label: 'Категорія', items: category },
  { label: 'Виробник', items: subcategory },
  { label: 'Тип автомобіля', items: carType },
  { label: 'Коробка передач', items: gearbox },
  { label: 'Тип палива', items: fuelType },
  { label: 'Тип кузова', items: carBodyType },
  { label: 'Кількість місць', items: seatsCount },
  { label: 'Тип приводу', items: driveType },
  { label: "Об'єм двигуна", items: engineVolume },
  { label: 'Колір', items: color },
  { label: 'Лакофарбове покриття', items: varnishCoating },
  { label: 'Технічний стан', items: technicalCondition },
  { label: 'Комфорт', items: comfort },
  { label: 'Мультимедіа', items: multimedia },
  { label: 'Безпека', items: security },
  { label: 'Розмитнена', items: сustomsСleared },
  { label: 'Авто пригнано з', items: theCarWasDrivenFrom },
] as IFilter[]

export const createAdFields = [
  { label: 'Технічний стан', items: technicalCondition },
  { label: 'Комфорт', items: comfort },
  { label: 'Мультимедіа', items: multimedia },
  { label: 'Безпека', items: security },
]
