export const products = [
  {
    id: 1,
    sku: "LED-E27-10W-WW",
    name: "Лампа LED E27 10W теплый свет",
    description: "Светодиодная лампа с теплым белым светом (2700K). Эквивалент лампы накаливания 75W. Срок службы до 25000 часов.",
    price: 199.00,
    stock_quantity: 500,
    category: "LED лампы",
    base_type: "E27",
    power: 10,
    image_url: "https://via.placeholder.com/300x300?text=LED+E27+10W"
  },
  {
    id: 2,
    sku: "LED-E27-12W-CW",
    name: "Лампа LED E27 12W холодный свет",
    description: "Светодиодная лампа с холодным белым светом (4000K). Эквивалент лампы накаливания 90W. Энергосберегающая.",
    price: 249.00,
    stock_quantity: 350,
    category: "LED лампы",
    base_type: "E27",
    power: 12,
    image_url: "https://via.placeholder.com/300x300?text=LED+E27+12W"
  },
  {
    id: 3,
    sku: "LED-E14-7W-WW",
    name: "Лампа LED E14 7W теплый свет",
    description: "Компактная светодиодная лампа для люстр и бра. Теплый белый свет (2700K).",
    price: 159.00,
    stock_quantity: 200,
    category: "LED лампы",
    base_type: "E14",
    power: 7,
    image_url: "https://via.placeholder.com/300x300?text=LED+E14+7W"
  },
  {
    id: 4,
    sku: "LED-GU10-9W-WW",
    name: "Лампа LED GU10 9W теплый свет",
    description: "Светодиодная лампа для точечных светильников. Угол свечения 120°. Теплый свет.",
    price: 329.00,
    stock_quantity: 150,
    category: "LED лампы",
    base_type: "GU10",
    power: 9,
    image_url: "https://via.placeholder.com/300x300?text=LED+GU10+9W"
  },
  {
    id: 5,
    sku: "LED-E27-15W-RGB",
    name: "Лампа LED E27 15W RGB",
    description: "Умная лампа с RGB подсветкой. Управление через приложение. Можно менять цвет и яркость.",
    price: 899.00,
    stock_quantity: 80,
    category: "Умные лампы",
    base_type: "E27",
    power: 15,
    image_url: "https://via.placeholder.com/300x300?text=LED+RGB+15W"
  },
  {
    id: 6,
    sku: "INC-E27-60W",
    name: "Лампа накаливания E27 60W",
    description: "Классическая лампа накаливания. Теплый свет. Прозрачная колба.",
    price: 49.00,
    stock_quantity: 1000,
    category: "Лампы накаливания",
    base_type: "E27",
    power: 60,
    image_url: "https://via.placeholder.com/300x300?text=Inc+E27+60W"
  },
  {
    id: 7,
    sku: "LED-E27-20W-CW",
    name: "Лампа LED E27 20W холодный свет",
    description: "Мощная светодиодная лампа для больших помещений. Холодный белый свет.",
    price: 399.00,
    stock_quantity: 250,
    category: "LED лампы",
    base_type: "E27",
    power: 20,
    image_url: "https://via.placeholder.com/300x300?text=LED+E27+20W"
  },
  {
    id: 8,
    sku: "LED-E14-5W-WW",
    name: "Лампа LED E14 5W свеча",
    description: "Светодиодная лампа-свеча для люстр. Теплый белый свет. Экономичное потребление.",
    price: 129.00,
    stock_quantity: 400,
    category: "LED лампы",
    base_type: "E14",
    power: 5,
    image_url: "https://via.placeholder.com/300x300?text=LED+E14+Candle"
  },
  {
    id: 9,
    sku: "LED-GU5.3-7W-WW",
    name: "Лампа LED GU5.3 7W теплый свет",
    description: "Светодиодная лампа для точечных светильников с напряжением 12V. Теплый свет.",
    price: 279.00,
    stock_quantity: 180,
    category: "LED лампы",
    base_type: "GU5.3",
    power: 7,
    image_url: "https://via.placeholder.com/300x300?text=LED+GU5.3+7W"
  },
  {
    id: 10,
    sku: "LED-E27-SMART-WIFI",
    name: "Лампа Smart LED E27 WiFi",
    description: "Умная лампа с управлением через WiFi. Совместима с Alexa и Google Assistant.",
    price: 1299.00,
    stock_quantity: 50,
    category: "Умные лампы",
    base_type: "E27",
    power: 12,
    image_url: "https://via.placeholder.com/300x300?text=Smart+LED+WiFi"
  }
];

export const categories = [
  "Все",
  "LED лампы",
  "Умные лампы",
  "Лампы накаливания"
];

export const baseTypes = [
  "Все",
  "E27",
  "E14",
  "GU10",
  "GU5.3"
];
