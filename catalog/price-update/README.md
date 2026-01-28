# Централизованное управление ценами

Все цены теперь хранятся в одном файле `prices.json` и автоматически загружаются на страницы Tilda.

## Как обновить цены

1. Откройте файл `prices.json` в репозитории GitHub
2. Обновите нужные цены в формате:
   ```json
   {
     "prices": {
       "belahis": "От 320 000 ₽",
       "agisum-oval": "от 320 000 ₽",
       ...
     }
   }
   ```
3. Сохраните и закоммитьте изменения в GitHub
4. Цены автоматически обновятся на всех страницах Tilda, которые используют эти блоки

## Структура файлов

- `prices.json` - централизованный файл с ценами всех товаров
- `popup-block.html` - блок с фиксированной кнопкой покупки (использует `data-product-id="belahis"`)
- `tables-info.html` - список столов (использует `data-product-id` для каждого товара)
- `tables-slider.html` - слайдер с рекомендациями (загружает цены из JSON)

## Идентификаторы товаров (productId)

- `belahis` - Журнальный стол Belahis
- `agisum-oval` - Agisum Oval
- `agisum` - Agisum
- `agisu` - Agisu
- `areolum` - Areolum
- `trubios` - Trubios
- `agisumus` - Agisumus
- `cryssora` - Cryssora
- `trubios-s` - Trubios S
- `elysius` - Elysius
- `agisur` - Agisur
- `fermitto` - Fermitto
- `arkulo` - Arkulo

## Добавление нового товара

1. Добавьте запись в `prices.json`:
   ```json
   "новый-товар": "от 350 000 ₽"
   ```

2. В HTML файлах добавьте `data-product-id="новый-товар"` к соответствующему элементу

3. Для слайдера добавьте `productId: 'новый-товар'` в массив `recommendationsBase`
