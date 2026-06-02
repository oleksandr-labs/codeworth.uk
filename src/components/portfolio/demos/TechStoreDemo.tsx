"use client";
import { useState } from "react";

const categories = [
  { key: "smartphones", en: "Smartphones", uk: "Смартфони", emoji: "📱" },
  { key: "laptops", en: "Laptops", uk: "Ноутбуки", emoji: "💻" },
  { key: "tvs", en: "TVs", uk: "Телевізори", emoji: "📺" },
  { key: "headphones", en: "Headphones", uk: "Навушники", emoji: "🎧" },
  { key: "tablets", en: "Tablets", uk: "Планшети", emoji: "🖥️" },
];

const brandsByCategory: Record<string, string[]> = {
  smartphones: ["Samsung", "Apple", "Xiaomi", "Google"],
  laptops: ["Apple", "Dell", "Lenovo", "ASUS"],
  tvs: ["LG", "Samsung", "Sony", "TCL"],
  headphones: ["Sony", "Apple", "JBL", "Sennheiser"],
  tablets: ["Apple", "Samsung", "Lenovo", "Huawei"],
};

const specFilterByCategory: Record<string, { labelEn: string; labelUk: string; options: string[] }> = {
  smartphones: { labelEn: "RAM", labelUk: "Оперативна пам'ять", options: ["Any", "4 GB", "6 GB", "8 GB", "12 GB"] },
  laptops: { labelEn: "RAM", labelUk: "Оперативна пам'ять", options: ["Any", "8 GB", "16 GB", "32 GB", "64 GB"] },
  tvs: { labelEn: "Screen Size", labelUk: "Діагональ", options: ["Any", "43\"", "50\"", "55\"", "65\"", "75\""] },
  headphones: { labelEn: "Type", labelUk: "Тип", options: ["Any", "In-ear", "On-ear", "Over-ear"] },
  tablets: { labelEn: "Screen Size", labelUk: "Діагональ", options: ["Any", "8\"", "10\"", "11\"", "12.9\""] },
};

const productsByCategory: Record<string, {
  id: number; emoji: string; nameEn: string; nameUk: string; brand: string;
  price: number; oldPrice?: number; rating: number; reviews: number;
  inStock: boolean;
  specsEn: Record<string, string>; specsUk: Record<string, string>;
}[]> = {
  smartphones: [
    { id: 1, emoji: "📱", nameEn: "Samsung Galaxy S25", nameUk: "Samsung Galaxy S25", brand: "Samsung", price: 32999, oldPrice: 36999, rating: 4.8, reviews: 312, inStock: true, specsEn: { Display: "6.2\" AMOLED 120Hz", Processor: "Snapdragon 8 Elite", RAM: "12 GB", Storage: "256 GB", Camera: "50MP + 12MP + 10MP", Battery: "4000 mAh", OS: "Android 15", Color: "Phantom Black" }, specsUk: { Дисплей: "6.2\" AMOLED 120Гц", Процесор: "Snapdragon 8 Elite", ОЗП: "12 ГБ", "Пам'ять": "256 ГБ", Камера: "50МП + 12МП + 10МП", Акумулятор: "4000 мАг", ОС: "Android 15", Колір: "Phantom Black" } },
    { id: 2, emoji: "🍎", nameEn: "iPhone 16 Pro", nameUk: "iPhone 16 Pro", brand: "Apple", price: 49999, rating: 4.9, reviews: 518, inStock: true, specsEn: { Display: "6.3\" Super Retina XDR", Processor: "A18 Pro", RAM: "8 GB", Storage: "256 GB", Camera: "48MP + 12MP + 12MP", Battery: "3582 mAh", OS: "iOS 18", Color: "Desert Titanium" }, specsUk: { Дисплей: "6.3\" Super Retina XDR", Процесор: "A18 Pro", ОЗП: "8 ГБ", "Пам'ять": "256 ГБ", Камера: "48МП + 12МП + 12МП", Акумулятор: "3582 мАг", ОС: "iOS 18", Колір: "Desert Titanium" } },
    { id: 3, emoji: "📱", nameEn: "Xiaomi 15", nameUk: "Xiaomi 15", brand: "Xiaomi", price: 24999, oldPrice: 27999, rating: 4.7, reviews: 203, inStock: true, specsEn: { Display: "6.36\" AMOLED 120Hz", Processor: "Snapdragon 8 Elite", RAM: "12 GB", Storage: "256 GB", Camera: "50MP Leica Triple", Battery: "5240 mAh", OS: "Android 15", Color: "White" }, specsUk: { Дисплей: "6.36\" AMOLED 120Гц", Процесор: "Snapdragon 8 Elite", ОЗП: "12 ГБ", "Пам'ять": "256 ГБ", Камера: "50МП Leica Triple", Акумулятор: "5240 мАг", ОС: "Android 15", Колір: "Білий" } },
    { id: 4, emoji: "🤖", nameEn: "Google Pixel 9", nameUk: "Google Pixel 9", brand: "Google", price: 28999, rating: 4.8, reviews: 156, inStock: false, specsEn: { Display: "6.3\" OLED 120Hz", Processor: "Google Tensor G4", RAM: "12 GB", Storage: "128 GB", Camera: "50MP + 48MP + 10.5MP", Battery: "4700 mAh", OS: "Android 15", Color: "Obsidian" }, specsUk: { Дисплей: "6.3\" OLED 120Гц", Процесор: "Google Tensor G4", ОЗП: "12 ГБ", "Пам'ять": "128 ГБ", Камера: "50МП + 48МП + 10.5МП", Акумулятор: "4700 мАг", ОС: "Android 15", Колір: "Obsidian" } },
    { id: 5, emoji: "📱", nameEn: "Samsung Galaxy A55", nameUk: "Samsung Galaxy A55", brand: "Samsung", price: 14999, oldPrice: 17499, rating: 4.6, reviews: 441, inStock: true, specsEn: { Display: "6.6\" Super AMOLED", Processor: "Exynos 1480", RAM: "8 GB", Storage: "128 GB", Camera: "50MP + 12MP + 5MP", Battery: "5000 mAh", OS: "Android 14", Color: "Awesome Navy" }, specsUk: { Дисплей: "6.6\" Super AMOLED", Процесор: "Exynos 1480", ОЗП: "8 ГБ", "Пам'ять": "128 ГБ", Камера: "50МП + 12МП + 5МП", Акумулятор: "5000 мАг", ОС: "Android 14", Колір: "Awesome Navy" } },
    { id: 6, emoji: "📱", nameEn: "Xiaomi Redmi Note 14", nameUk: "Xiaomi Redmi Note 14", brand: "Xiaomi", price: 8999, rating: 4.5, reviews: 892, inStock: true, specsEn: { Display: "6.67\" AMOLED 120Hz", Processor: "Snapdragon 7s Gen 3", RAM: "8 GB", Storage: "256 GB", Camera: "200MP + 8MP + 2MP", Battery: "5500 mAh", OS: "Android 14", Color: "Midnight Black" }, specsUk: { Дисплей: "6.67\" AMOLED 120Гц", Процесор: "Snapdragon 7s Gen 3", ОЗП: "8 ГБ", "Пам'ять": "256 ГБ", Камера: "200МП + 8МП + 2МП", Акумулятор: "5500 мАг", ОС: "Android 14", Колір: "Midnight Black" } },
  ],
  laptops: [
    { id: 7, emoji: "💻", nameEn: "MacBook Pro 14\" M4", nameUk: "MacBook Pro 14\" M4", brand: "Apple", price: 89999, rating: 4.9, reviews: 287, inStock: true, specsEn: { Display: "14.2\" Liquid Retina XDR", Processor: "Apple M4 Pro", RAM: "24 GB", Storage: "512 GB SSD", GPU: "20-core GPU", Battery: "Up to 22h", OS: "macOS Sequoia", Weight: "1.55 kg" }, specsUk: { Дисплей: "14.2\" Liquid Retina XDR", Процесор: "Apple M4 Pro", ОЗП: "24 ГБ", "Пам'ять": "512 ГБ SSD", Відеокарта: "20-ядерний GPU", Акумулятор: "До 22 год", ОС: "macOS Sequoia", Вага: "1.55 кг" } },
    { id: 8, emoji: "💻", nameEn: "Dell XPS 15", nameUk: "Dell XPS 15", brand: "Dell", price: 67999, oldPrice: 74999, rating: 4.7, reviews: 134, inStock: true, specsEn: { Display: "15.6\" OLED 3.5K", Processor: "Intel Core Ultra 9", RAM: "32 GB", Storage: "1 TB SSD", GPU: "NVIDIA RTX 4070", Battery: "Up to 13h", OS: "Windows 11 Pro", Weight: "1.86 kg" }, specsUk: { Дисплей: "15.6\" OLED 3.5K", Процесор: "Intel Core Ultra 9", ОЗП: "32 ГБ", "Пам'ять": "1 ТБ SSD", Відеокарта: "NVIDIA RTX 4070", Акумулятор: "До 13 год", ОС: "Windows 11 Pro", Вага: "1.86 кг" } },
    { id: 9, emoji: "💻", nameEn: "Lenovo ThinkPad X1 Carbon", nameUk: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", price: 54999, rating: 4.8, reviews: 98, inStock: true, specsEn: { Display: "14\" IPS 2.8K", Processor: "Intel Core Ultra 7", RAM: "16 GB", Storage: "512 GB SSD", GPU: "Intel Arc Graphics", Battery: "Up to 15h", OS: "Windows 11 Pro", Weight: "1.12 kg" }, specsUk: { Дисплей: "14\" IPS 2.8K", Процесор: "Intel Core Ultra 7", ОЗП: "16 ГБ", "Пам'ять": "512 ГБ SSD", Відеокарта: "Intel Arc Graphics", Акумулятор: "До 15 год", ОС: "Windows 11 Pro", Вага: "1.12 кг" } },
    { id: 10, emoji: "💻", nameEn: "ASUS ROG Zephyrus G14", nameUk: "ASUS ROG Zephyrus G14", brand: "ASUS", price: 62999, oldPrice: 69999, rating: 4.8, reviews: 221, inStock: false, specsEn: { Display: "14\" OLED 165Hz", Processor: "AMD Ryzen 9 8945HS", RAM: "32 GB", Storage: "1 TB SSD", GPU: "NVIDIA RTX 4070", Battery: "Up to 10h", OS: "Windows 11 Home", Weight: "1.65 kg" }, specsUk: { Дисплей: "14\" OLED 165Гц", Процесор: "AMD Ryzen 9 8945HS", ОЗП: "32 ГБ", "Пам'ять": "1 ТБ SSD", Відеокарта: "NVIDIA RTX 4070", Акумулятор: "До 10 год", ОС: "Windows 11 Home", Вага: "1.65 кг" } },
    { id: 11, emoji: "💻", nameEn: "MacBook Air 13\" M3", nameUk: "MacBook Air 13\" M3", brand: "Apple", price: 54999, rating: 4.9, reviews: 456, inStock: true, specsEn: { Display: "13.6\" Liquid Retina", Processor: "Apple M3", RAM: "8 GB", Storage: "256 GB SSD", GPU: "10-core GPU", Battery: "Up to 18h", OS: "macOS Sequoia", Weight: "1.24 kg" }, specsUk: { Дисплей: "13.6\" Liquid Retina", Процесор: "Apple M3", ОЗП: "8 ГБ", "Пам'ять": "256 ГБ SSD", Відеокарта: "10-ядерний GPU", Акумулятор: "До 18 год", ОС: "macOS Sequoia", Вага: "1.24 кг" } },
    { id: 12, emoji: "💻", nameEn: "Lenovo IdeaPad 5", nameUk: "Lenovo IdeaPad 5", brand: "Lenovo", price: 19999, oldPrice: 23999, rating: 4.5, reviews: 673, inStock: true, specsEn: { Display: "15.6\" IPS FHD", Processor: "AMD Ryzen 5 7530U", RAM: "16 GB", Storage: "512 GB SSD", GPU: "AMD Radeon", Battery: "Up to 12h", OS: "Windows 11 Home", Weight: "1.79 kg" }, specsUk: { Дисплей: "15.6\" IPS FHD", Процесор: "AMD Ryzen 5 7530U", ОЗП: "16 ГБ", "Пам'ять": "512 ГБ SSD", Відеокарта: "AMD Radeon", Акумулятор: "До 12 год", ОС: "Windows 11 Home", Вага: "1.79 кг" } },
  ],
  tvs: [
    { id: 13, emoji: "📺", nameEn: "LG OLED C4 65\"", nameUk: "LG OLED C4 65\"", brand: "LG", price: 69999, oldPrice: 79999, rating: 4.9, reviews: 178, inStock: true, specsEn: { Panel: "OLED evo", Resolution: "4K UHD", "Screen Size": "65\"", Refresh: "120Hz", HDR: "Dolby Vision IQ", Sound: "60W 4.2ch", OS: "webOS 24", Smart: "Yes" }, specsUk: { Панель: "OLED evo", Роздільність: "4K UHD", Діагональ: "65\"", Частота: "120Гц", HDR: "Dolby Vision IQ", Звук: "60Вт 4.2ch", ОС: "webOS 24", Smart: "Так" } },
    { id: 14, emoji: "📺", nameEn: "Samsung Neo QLED 55\"", nameUk: "Samsung Neo QLED 55\"", brand: "Samsung", price: 44999, rating: 4.8, reviews: 234, inStock: true, specsEn: { Panel: "Neo QLED", Resolution: "4K UHD", "Screen Size": "55\"", Refresh: "144Hz", HDR: "HDR10+", Sound: "40W 2.2ch", OS: "Tizen 8", Smart: "Yes" }, specsUk: { Панель: "Neo QLED", Роздільність: "4K UHD", Діагональ: "55\"", Частота: "144Гц", HDR: "HDR10+", Звук: "40Вт 2.2ch", ОС: "Tizen 8", Smart: "Так" } },
    { id: 15, emoji: "📺", nameEn: "Sony BRAVIA 7 50\"", nameUk: "Sony BRAVIA 7 50\"", brand: "Sony", price: 38999, oldPrice: 44999, rating: 4.7, reviews: 112, inStock: true, specsEn: { Panel: "Mini LED", Resolution: "4K UHD", "Screen Size": "50\"", Refresh: "120Hz", HDR: "Dolby Vision", Sound: "50W 2.1ch", OS: "Google TV", Smart: "Yes" }, specsUk: { Панель: "Mini LED", Роздільність: "4K UHD", Діагональ: "50\"", Частота: "120Гц", HDR: "Dolby Vision", Звук: "50Вт 2.1ch", ОС: "Google TV", Smart: "Так" } },
    { id: 16, emoji: "📺", nameEn: "TCL 43\" 4K Smart", nameUk: "TCL 43\" 4K Smart", brand: "TCL", price: 11999, rating: 4.4, reviews: 567, inStock: true, specsEn: { Panel: "LED", Resolution: "4K UHD", "Screen Size": "43\"", Refresh: "60Hz", HDR: "HDR10", Sound: "16W 2ch", OS: "Google TV", Smart: "Yes" }, specsUk: { Панель: "LED", Роздільність: "4K UHD", Діагональ: "43\"", Частота: "60Гц", HDR: "HDR10", Звук: "16Вт 2ch", ОС: "Google TV", Smart: "Так" } },
    { id: 17, emoji: "📺", nameEn: "LG QNED 75\"", nameUk: "LG QNED 75\"", brand: "LG", price: 54999, oldPrice: 61999, rating: 4.7, reviews: 89, inStock: false, specsEn: { Panel: "QNED Mini LED", Resolution: "4K UHD", "Screen Size": "75\"", Refresh: "120Hz", HDR: "Dolby Vision IQ", Sound: "40W 2.2ch", OS: "webOS 24", Smart: "Yes" }, specsUk: { Панель: "QNED Mini LED", Роздільність: "4K UHD", Діагональ: "75\"", Частота: "120Гц", HDR: "Dolby Vision IQ", Звук: "40Вт 2.2ch", ОС: "webOS 24", Smart: "Так" } },
    { id: 18, emoji: "📺", nameEn: "Samsung The Frame 55\"", nameUk: "Samsung The Frame 55\"", brand: "Samsung", price: 39999, rating: 4.6, reviews: 143, inStock: true, specsEn: { Panel: "QLED", Resolution: "4K UHD", "Screen Size": "55\"", Refresh: "100Hz", HDR: "HDR10+", Sound: "40W 2.2ch", OS: "Tizen 8", Smart: "Yes" }, specsUk: { Панель: "QLED", Роздільність: "4K UHD", Діагональ: "55\"", Частота: "100Гц", HDR: "HDR10+", Звук: "40Вт 2.2ch", ОС: "Tizen 8", Smart: "Так" } },
  ],
  headphones: [
    { id: 19, emoji: "🎧", nameEn: "Sony WH-1000XM5", nameUk: "Sony WH-1000XM5", brand: "Sony", price: 12999, oldPrice: 14999, rating: 4.9, reviews: 892, inStock: true, specsEn: { Type: "Over-ear", Connection: "Bluetooth 5.2", ANC: "Yes", Battery: "30h", Driver: "30mm", Frequency: "4–40,000 Hz", Microphone: "8 mics", Weight: "250g" }, specsUk: { Тип: "Over-ear", "З'єднання": "Bluetooth 5.2", Шумопоглинання: "Так", Акумулятор: "30 год", Драйвер: "30мм", Частота: "4–40,000 Гц", Мікрофон: "8 мікрофонів", Вага: "250г" } },
    { id: 20, emoji: "🎵", nameEn: "Apple AirPods Pro 2", nameUk: "Apple AirPods Pro 2", brand: "Apple", price: 9999, rating: 4.8, reviews: 1243, inStock: true, specsEn: { Type: "In-ear", Connection: "Bluetooth 5.3", ANC: "Yes", Battery: "6h + 30h case", Driver: "Custom H2 chip", Frequency: "20–20,000 Hz", Microphone: "Adaptive", Weight: "5.3g each" }, specsUk: { Тип: "In-ear", "З'єднання": "Bluetooth 5.3", Шумопоглинання: "Так", Акумулятор: "6 год + 30 год (кейс)", Драйвер: "Чіп H2", Частота: "20–20,000 Гц", Мікрофон: "Адаптивний", Вага: "5.3г кожен" } },
    { id: 21, emoji: "🎧", nameEn: "JBL Live 770NC", nameUk: "JBL Live 770NC", brand: "JBL", price: 4999, oldPrice: 5999, rating: 4.6, reviews: 334, inStock: true, specsEn: { Type: "Over-ear", Connection: "Bluetooth 5.3", ANC: "Yes", Battery: "50h", Driver: "40mm", Frequency: "20–20,000 Hz", Microphone: "4 mics", Weight: "278g" }, specsUk: { Тип: "Over-ear", "З'єднання": "Bluetooth 5.3", Шумопоглинання: "Так", Акумулятор: "50 год", Драйвер: "40мм", Частота: "20–20,000 Гц", Мікрофон: "4 мікрофони", Вага: "278г" } },
    { id: 22, emoji: "🎧", nameEn: "Sennheiser Momentum 4", nameUk: "Sennheiser Momentum 4", brand: "Sennheiser", price: 14999, rating: 4.8, reviews: 211, inStock: true, specsEn: { Type: "Over-ear", Connection: "Bluetooth 5.2", ANC: "Yes", Battery: "60h", Driver: "42mm", Frequency: "6–22,000 Hz", Microphone: "4 mics", Weight: "293g" }, specsUk: { Тип: "Over-ear", "З'єднання": "Bluetooth 5.2", Шумопоглинання: "Так", Акумулятор: "60 год", Драйвер: "42мм", Частота: "6–22,000 Гц", Мікрофон: "4 мікрофони", Вага: "293г" } },
    { id: 23, emoji: "🎵", nameEn: "JBL Tune 760NC", nameUk: "JBL Tune 760NC", brand: "JBL", price: 2499, oldPrice: 3499, rating: 4.4, reviews: 678, inStock: true, specsEn: { Type: "On-ear", Connection: "Bluetooth 5.0", ANC: "Yes", Battery: "35h", Driver: "40mm", Frequency: "20–20,000 Hz", Microphone: "1 mic", Weight: "216g" }, specsUk: { Тип: "On-ear", "З'єднання": "Bluetooth 5.0", Шумопоглинання: "Так", Акумулятор: "35 год", Драйвер: "40мм", Частота: "20–20,000 Гц", Мікрофон: "1 мікрофон", Вага: "216г" } },
    { id: 24, emoji: "🎵", nameEn: "Sony WF-1000XM5", nameUk: "Sony WF-1000XM5", brand: "Sony", price: 8499, rating: 4.9, reviews: 445, inStock: false, specsEn: { Type: "In-ear", Connection: "Bluetooth 5.3", ANC: "Yes", Battery: "8h + 24h case", Driver: "8.4mm", Frequency: "4–40,000 Hz", Microphone: "6 mics", Weight: "5.9g each" }, specsUk: { Тип: "In-ear", "З'єднання": "Bluetooth 5.3", Шумопоглинання: "Так", Акумулятор: "8 год + 24 год (кейс)", Драйвер: "8.4мм", Частота: "4–40,000 Гц", Мікрофон: "6 мікрофонів", Вага: "5.9г кожен" } },
  ],
  tablets: [
    { id: 25, emoji: "🖥️", nameEn: "iPad Pro 13\" M4", nameUk: "iPad Pro 13\" M4", brand: "Apple", price: 59999, rating: 4.9, reviews: 334, inStock: true, specsEn: { Display: "13\" Ultra Retina XDR OLED", Processor: "Apple M4", RAM: "8 GB", Storage: "256 GB", Camera: "12MP + 12MP", Battery: "Up to 10h", OS: "iPadOS 18", Weight: "579g" }, specsUk: { Дисплей: "13\" Ultra Retina XDR OLED", Процесор: "Apple M4", ОЗП: "8 ГБ", "Пам'ять": "256 ГБ", Камера: "12МП + 12МП", Акумулятор: "До 10 год", ОС: "iPadOS 18", Вага: "579г" } },
    { id: 26, emoji: "🖥️", nameEn: "Samsung Galaxy Tab S10+", nameUk: "Samsung Galaxy Tab S10+", brand: "Samsung", price: 34999, oldPrice: 39999, rating: 4.8, reviews: 198, inStock: true, specsEn: { Display: "12.4\" Dynamic AMOLED", Processor: "Snapdragon 8 Gen 3", RAM: "12 GB", Storage: "256 GB", Camera: "13MP + 8MP", Battery: "10090 mAh", OS: "Android 14", Weight: "581g" }, specsUk: { Дисплей: "12.4\" Dynamic AMOLED", Процесор: "Snapdragon 8 Gen 3", ОЗП: "12 ГБ", "Пам'ять": "256 ГБ", Камера: "13МП + 8МП", Акумулятор: "10090 мАг", ОС: "Android 14", Вага: "581г" } },
    { id: 27, emoji: "🖥️", nameEn: "Lenovo Tab P12 Pro", nameUk: "Lenovo Tab P12 Pro", brand: "Lenovo", price: 19999, rating: 4.6, reviews: 87, inStock: true, specsEn: { Display: "12.6\" AMOLED 120Hz", Processor: "Snapdragon 870", RAM: "8 GB", Storage: "256 GB", Camera: "13MP + 5MP", Battery: "10200 mAh", OS: "Android 13", Weight: "565g" }, specsUk: { Дисплей: "12.6\" AMOLED 120Гц", Процесор: "Snapdragon 870", ОЗП: "8 ГБ", "Пам'ять": "256 ГБ", Камера: "13МП + 5МП", Акумулятор: "10200 мАг", ОС: "Android 13", Вага: "565г" } },
    { id: 28, emoji: "🖥️", nameEn: "iPad Air 11\" M2", nameUk: "iPad Air 11\" M2", brand: "Apple", price: 34999, rating: 4.8, reviews: 412, inStock: false, specsEn: { Display: "11\" Liquid Retina", Processor: "Apple M2", RAM: "8 GB", Storage: "128 GB", Camera: "12MP + 12MP", Battery: "Up to 10h", OS: "iPadOS 18", Weight: "462g" }, specsUk: { Дисплей: "11\" Liquid Retina", Процесор: "Apple M2", ОЗП: "8 ГБ", "Пам'ять": "128 ГБ", Камера: "12МП + 12МП", Акумулятор: "До 10 год", ОС: "iPadOS 18", Вага: "462г" } },
    { id: 29, emoji: "🖥️", nameEn: "Huawei MatePad Pro 12.2\"", nameUk: "Huawei MatePad Pro 12.2\"", brand: "Huawei", price: 27999, oldPrice: 31999, rating: 4.5, reviews: 156, inStock: true, specsEn: { Display: "12.2\" OLED 144Hz", Processor: "Kirin 9000S", RAM: "12 GB", Storage: "256 GB", Camera: "13MP + 8MP", Battery: "10100 mAh", OS: "HarmonyOS 4", Weight: "508g" }, specsUk: { Дисплей: "12.2\" OLED 144Гц", Процесор: "Kirin 9000S", ОЗП: "12 ГБ", "Пам'ять": "256 ГБ", Камера: "13МП + 8МП", Акумулятор: "10100 мАг", ОС: "HarmonyOS 4", Вага: "508г" } },
    { id: 30, emoji: "🖥️", nameEn: "Samsung Galaxy Tab A9+", nameUk: "Samsung Galaxy Tab A9+", brand: "Samsung", price: 9999, rating: 4.4, reviews: 523, inStock: true, specsEn: { Display: "11\" LCD 90Hz", Processor: "Snapdragon 695", RAM: "8 GB", Storage: "128 GB", Camera: "8MP + 5MP", Battery: "7040 mAh", OS: "Android 13", Weight: "480g" }, specsUk: { Дисплей: "11\" LCD 90Гц", Процесор: "Snapdragon 695", ОЗП: "8 ГБ", "Пам'ять": "128 ГБ", Камера: "8МП + 5МП", Акумулятор: "7040 мАг", ОС: "Android 13", Вага: "480г" } },
  ],
};

const banners = [
  { emoji: "🔥", titleEn: "Hot Deals", titleUk: "Гарячі знижки", subtitleEn: "Up to 40% off top brands", subtitleUk: "До 40% знижки на топ-бренди", bg: "bg-linear-to-br from-cyan-600 to-blue-800", ctaEn: "Shop Now", ctaUk: "Купити" },
  { emoji: "💰", titleEn: "Budget Picks under ₴5000", titleUk: "Бюджетні товари до ₴5000", subtitleEn: "Premium quality for less", subtitleUk: "Преміум якість за доступною ціною", bg: "bg-linear-to-br from-emerald-600 to-teal-800", ctaEn: "Explore", ctaUk: "Дивитись" },
  { emoji: "⚡", titleEn: "Clearance Sale", titleUk: "Розпродаж залишків", subtitleEn: "Last items at rock-bottom prices", subtitleUk: "Останні одиниці за мінімальними цінами", bg: "bg-linear-to-br from-orange-500 to-red-700", ctaEn: "Grab It", ctaUk: "Встигни" },
];

const deals = [
  { id: 1, emoji: "📱", nameEn: "Xiaomi Redmi 13C", nameUk: "Xiaomi Redmi 13C", price: 4299, oldPrice: 5999, discount: 28, timer: "02:14:33" },
  { id: 2, emoji: "🎧", nameEn: "JBL Tune 510BT", nameUk: "JBL Tune 510BT", price: 899, oldPrice: 1399, discount: 36, timer: "01:08:15" },
  { id: 3, emoji: "💻", nameEn: "Lenovo IdeaPad 1", nameUk: "Lenovo IdeaPad 1", price: 12999, oldPrice: 16999, discount: 24, timer: "03:45:02" },
  { id: 4, emoji: "📺", nameEn: "TCL 32\" HD Smart", nameUk: "TCL 32\" HD Smart", price: 5499, oldPrice: 7299, discount: 25, timer: "00:52:47" },
];

const reviews = [
  { author: "Олексій К.", rating: 5, verified: true, dateEn: "March 12, 2026", dateUk: "12 березня 2026", textEn: "Excellent product, fast delivery. The phone works perfectly, camera is outstanding. Would definitely recommend TechStore UA!", textUk: "Чудовий товар, швидка доставка. Телефон працює ідеально, камера вражає. Однозначно рекомендую TechStore UA!" },
  { author: "Марія Л.", rating: 5, verified: true, dateEn: "March 8, 2026", dateUk: "8 березня 2026", textEn: "Ordered the Galaxy S25. Came well packaged, all genuine. The store consultant helped me choose the right model. Very satisfied!", textUk: "Замовила Galaxy S25. Прийшов у відмінній упаковці, все оригінальне. Консультант допоміг обрати модель. Дуже задоволена!" },
  { author: "Дмитро В.", rating: 4, verified: false, dateEn: "March 5, 2026", dateUk: "5 березня 2026", textEn: "Good service, competitive prices. Delivery took 2 days as promised. Minor packaging dent but product is fine. Will order again.", textUk: "Хороший сервіс, конкурентні ціни. Доставка 2 дні, як і обіцяли. Незначна вм'ятина на упаковці, але товар у порядку. Замовлю ще." },
];

const navCategories = [
  { en: "📱 Phones", uk: "📱 Телефони" },
  { en: "💻 Laptops", uk: "💻 Ноутбуки" },
  { en: "📺 TVs", uk: "📺 Телевізори" },
  { en: "🎮 Gaming", uk: "🎮 Ігри" },
  { en: "🔧 Accessories", uk: "🔧 Аксесуари" },
  { en: "🛡️ Warranty", uk: "🛡️ Гарантія" },
];

const quickLinks = [
  { emoji: "📱", en: "Phones", uk: "Телефони", cat: "smartphones" },
  { emoji: "💻", en: "Laptops", uk: "Ноутбуки", cat: "laptops" },
  { emoji: "📺", en: "TVs", uk: "Телевізори", cat: "tvs" },
  { emoji: "🎧", en: "Audio", uk: "Аудіо", cat: "headphones" },
  { emoji: "🖥️", en: "Tablets", uk: "Планшети", cat: "tablets" },
];

const paymentMethods = ["💳 Visa / MasterCard", "🏦 ПриватБанк", "💚 Monobank", "💵 Готівка", "📦 Накладений платіж", "📱 Apple Pay / Google Pay"];
const footerGuarantees = [
  { emoji: "🛡️", en: "Official warranty", uk: "Офіційна гарантія" },
  { emoji: "🔄", en: "30-day returns", uk: "Повернення 30 днів" },
  { emoji: "🚚", en: "Free delivery from ₴999", uk: "Безкоштовна доставка від ₴999" },
  { emoji: "📞", en: "24/7 support", uk: "Підтримка 24/7" },
];

export function TechStoreDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Header state
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState<{ id: number; name: string; price: number; qty: number; emoji: string }[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Banner state
  const [activeBanner, setActiveBanner] = useState(0);

  // Catalog state
  const [activeCategory, setActiveCategory] = useState("smartphones");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(50000);
  const [specFilter, setSpecFilter] = useState("Any");

  // Quick view state
  const [quickViewProduct, setQuickViewProduct] = useState<typeof productsByCategory["smartphones"][0] | null>(null);

  // Compare state
  const [compareList, setCompareList] = useState<typeof productsByCategory["smartphones"][0][]>([]);
  const [showCompare, setShowCompare] = useState(false);

  // Credit calculator state
  const [creditProductId, setCreditProductId] = useState<number | null>(null);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [creditTerm, setCreditTerm] = useState(12);

  // Promo code state
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const products = productsByCategory[activeCategory] ?? [];
  const brands = brandsByCategory[activeCategory] ?? [];
  const specMeta = specFilterByCategory[activeCategory];

  const filteredProducts = products.filter((p) => {
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) return false;
    if (p.price > priceRange) return false;
    return true;
  });

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  }

  function addToCart(product: typeof products[0]) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, name: isUk ? product.nameUk : product.nameEn, price: product.price, qty: 1, emoji: product.emoji }];
    });
  }

  function removeFromCart(id: number) {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }

  function changeQty(id: number, delta: number) {
    setCartItems((prev) => prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i).filter((i) => i.qty > 0));
  }

  function toggleCompare(product: typeof products[0]) {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  }

  const cartTotal = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const discountedTotal = promoApplied ? Math.round(cartTotal * 0.9) : cartTotal;

  const creditProduct = creditProductId ? [...Object.values(productsByCategory).flat()].find((p) => p.id === creditProductId) : null;
  const creditPrice = creditProduct ? creditProduct.price : 0;
  const downAmount = Math.round(creditPrice * downPaymentPct / 100);
  const loanAmount = creditPrice - downAmount;
  const monthlyPayment = creditTerm > 0 ? Math.round(loanAmount / creditTerm * 1.15) : 0;

  const compareSpecKeys = compareList.length > 0
    ? Object.keys(isUk ? compareList[0].specsUk : compareList[0].specsEn)
    : [];

  return (
    <div className="bg-gray-50 dark:bg-neutral-900 font-sans text-gray-900 dark:text-white min-h-screen text-sm">

      {/* ── HEADER ── */}
      <header className="bg-[#111827] text-white sticky top-0 z-40 shadow-lg">
        {/* Top bar */}
        <div className="border-b border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-4">
            <span>📞 0 800 123 456</span>
            <span>🕐 {isUk ? "Пн–Нд 8:00–22:00" : "Mon–Sun 8:00–22:00"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-green-400">✅ {isUk ? "Офіційний дилер" : "Authorized Dealer"}</span>
            <span>🚚 {isUk ? "Безкоштовна доставка від ₴999" : "Free delivery from ₴999"}</span>
          </div>
        </div>
        {/* Main header row */}
        <div className="px-4 py-3 flex items-center gap-4">
          <div className="shrink-0 text-xl font-bold text-cyan-400 tracking-tight">💻 TechStore</div>
          {/* Search */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUk ? "🔍 Пошук товарів..." : "🔍 Search products..."}
              className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500 hover:text-white">✕</button>
            )}
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="text-xs text-gray-300 hover:text-white flex flex-col items-center gap-0.5">
              <span className="text-lg">❤️</span>
              <span>{isUk ? "Обрані" : "Wishlist"}</span>
            </button>
            <button className="text-xs text-gray-300 hover:text-white flex flex-col items-center gap-0.5">
              <span className="text-lg">👤</span>
              <span>{isUk ? "Увійти" : "Sign In"}</span>
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-xs text-gray-300 hover:text-white flex flex-col items-center gap-0.5"
            >
              <span className="text-lg">🛒</span>
              <span>{isUk ? "Кошик" : "Cart"}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>
              )}
            </button>
            <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shrink-0 animate-pulse">🔔 SALE</div>
          </div>
        </div>
        {/* Nav categories */}
        <nav className="px-4 pb-2 flex items-center gap-1 overflow-x-auto">
          {navCategories.map((cat) => (
            <button
              key={cat.en}
              className="shrink-0 text-xs text-gray-300 hover:text-cyan-400 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
            >
              {isUk ? cat.uk : cat.en}
            </button>
          ))}
        </nav>
      </header>

      {/* ── HERO / BANNERS ── */}
      <section className="px-4 pt-4 pb-2">
        <div className={`rounded-xl ${banners[activeBanner].bg} text-white p-6 relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="text-5xl mb-2">{banners[activeBanner].emoji}</div>
            <h2 className="text-2xl font-bold mb-1">{isUk ? banners[activeBanner].titleUk : banners[activeBanner].titleEn}</h2>
            <p className="text-white/80 mb-4 text-sm">{isUk ? banners[activeBanner].subtitleUk : banners[activeBanner].subtitleEn}</p>
            <button className="bg-white text-gray-900 dark:text-white font-bold px-5 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 transition-colors">
              {isUk ? banners[activeBanner].ctaUk : banners[activeBanner].ctaEn} →
            </button>
          </div>
          {/* Banner dots */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${i === activeBanner ? "bg-white" : "bg-white/40"}`}
              />
            ))}
          </div>
        </div>
        {/* Quick category links */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {quickLinks.map((link) => (
            <button
              key={link.cat}
              onClick={() => setActiveCategory(link.cat)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === link.cat ? "bg-cyan-500 text-white" : "bg-white text-gray-700 dark:text-neutral-300 hover:bg-cyan-50 hover:text-cyan-700 border border-gray-200"}`}
            >
              <span>{link.emoji}</span>
              <span>{isUk ? link.uk : link.en}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── PRODUCT CATALOG ── */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">
          {isUk ? "Каталог товарів" : "Product Catalog"}
        </h2>
        {/* Category tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setSelectedBrands([]); setSpecFilter("Any"); setPriceRange(50000); }}
              className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeCategory === cat.key ? "bg-[#111827] text-cyan-400" : "bg-white text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700 dark:bg-neutral-800 border border-gray-200"}`}
            >
              <span>{cat.emoji}</span>
              <span>{isUk ? cat.uk : cat.en}</span>
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Sidebar filters */}
          <div className="hidden md:block w-44 shrink-0 space-y-4">
            {/* Brand filter */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="font-semibold text-xs text-gray-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">{isUk ? "Бренд" : "Brand"}</div>
              <div className="space-y-1.5">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-gray-700">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Price range */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="font-semibold text-xs text-gray-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">{isUk ? "Ціна до" : "Max Price"}</div>
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-cyan-500"
              />
              <div className="text-xs text-cyan-600 font-semibold mt-1">₴{priceRange.toLocaleString()}</div>
            </div>
            {/* Spec filter */}
            <div className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="font-semibold text-xs text-gray-700 dark:text-neutral-300 mb-2 uppercase tracking-wide">
                {isUk ? specMeta.labelUk : specMeta.labelEn}
              </div>
              <div className="space-y-1.5">
                {specMeta.options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="spec"
                      checked={specFilter === opt}
                      onChange={() => setSpecFilter(opt)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-gray-700">{opt === "Any" ? (isUk ? "Будь-який" : "Any") : opt}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Reset */}
            {(selectedBrands.length > 0 || priceRange < 100000 || specFilter !== "Any") && (
              <button
                onClick={() => { setSelectedBrands([]); setPriceRange(50000); setSpecFilter("Any"); }}
                className="w-full text-xs text-red-500 hover:text-red-700 underline"
              >
                {isUk ? "Скинути фільтри" : "Reset filters"}
              </button>
            )}
          </div>

          {/* Product grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-4xl mb-2">🔍</div>
                <div>{isUk ? "Товари не знайдено" : "No products found"}</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {filteredProducts.map((product) => {
                  const inCompare = compareList.some((p) => p.id === product.id);
                  const inCart = cartItems.some((i) => i.id === product.id);
                  return (
                    <div key={product.id} className="bg-white rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
                      {/* Image placeholder */}
                      <div
                        className="bg-linear-to-br from-gray-50 to-gray-100 h-28 flex items-center justify-center text-4xl cursor-pointer"
                        onClick={() => setQuickViewProduct(product)}
                      >
                        {product.emoji}
                      </div>
                      <div className="p-2.5 flex flex-col flex-1">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="text-xs font-semibold text-gray-800 dark:text-neutral-200 hover:text-cyan-600 text-left line-clamp-2 mb-1"
                        >
                          {isUk ? product.nameUk : product.nameEn}
                        </button>
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-1.5">
                          <span className="text-yellow-400 text-xs">{"⭐".repeat(Math.floor(product.rating))}</span>
                          <span className="text-[10px] text-gray-500">({product.reviews})</span>
                        </div>
                        {/* Price */}
                        <div className="flex items-baseline gap-1.5 mb-1.5">
                          <span className="text-sm font-bold text-gray-900">₴{product.price.toLocaleString()}</span>
                          {product.oldPrice && (
                            <span className="text-[10px] text-gray-400 dark:text-neutral-500 line-through">₴{product.oldPrice.toLocaleString()}</span>
                          )}
                        </div>
                        {/* Stock badge */}
                        <div className="mb-2">
                          <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                            {product.inStock ? (isUk ? "✅ В наявності" : "✅ In stock") : (isUk ? "⏳ Передзамовлення" : "⏳ Pre-order")}
                          </span>
                        </div>
                        <div className="mt-auto flex gap-1">
                          <button
                            onClick={() => addToCart(product)}
                            className={`flex-1 text-[10px] font-semibold py-1.5 rounded-lg transition-colors ${inCart ? "bg-cyan-600 text-white" : "bg-cyan-500 hover:bg-cyan-600 text-white"}`}
                          >
                            {inCart ? (isUk ? "✓ В кошику" : "✓ In Cart") : (isUk ? "🛒 Купити" : "🛒 Buy")}
                          </button>
                          <button
                            onClick={() => toggleCompare(product)}
                            className={`text-[10px] font-semibold px-2 py-1.5 rounded-lg border transition-colors ${inCompare ? "bg-blue-100 border-blue-400 text-blue-700" : "border-gray-300 text-gray-500 dark:text-neutral-400 hover:border-blue-400 hover:text-blue-600"}`}
                            title={isUk ? "Порівняти" : "Compare"}
                          >
                            ⚖️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── DEALS SECTION ── */}
      <section className="px-4 py-4 bg-[#111827]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-bold text-white">⚡ {isUk ? "Пропозиції дня" : "Today's Deals"}</h2>
          <span className="text-xs text-cyan-400 font-semibold">🔥 Flash Sale</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {deals.map((deal) => (
            <div key={deal.id} className="bg-gray-800 rounded-xl p-3 border border-gray-700 hover:border-cyan-500 transition-colors">
              <div className="text-3xl text-center mb-2">{deal.emoji}</div>
              <div className="text-xs font-semibold text-white mb-1 line-clamp-2 text-center">{isUk ? deal.nameUk : deal.nameEn}</div>
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="text-sm font-bold text-cyan-400">₴{deal.price.toLocaleString()}</span>
                <span className="text-[10px] text-gray-500 dark:text-neutral-400 line-through">₴{deal.oldPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">-{deal.discount}%</span>
                <span className="text-[10px] text-gray-400 dark:text-neutral-500 font-mono">⏱ {deal.timer}</span>
              </div>
              <button
                onClick={() => addToCart({ id: deal.id + 100, emoji: deal.emoji, nameEn: deal.nameEn, nameUk: deal.nameUk, brand: "", price: deal.price, rating: 4.5, reviews: 0, inStock: true, specsEn: {}, specsUk: {} })}
                className="mt-2 w-full text-[10px] font-semibold py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
              >
                {isUk ? "Купити зараз" : "Buy Now"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── CREDIT CALCULATOR ── */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">💳 {isUk ? "Кредитний калькулятор" : "Credit Calculator"}</h2>
        <div className="bg-white rounded-xl border border-gray-200 dark:border-neutral-700 p-4">
          {/* Product selector */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1">{isUk ? "Оберіть товар" : "Select product"}</label>
            <select
              value={creditProductId ?? ""}
              onChange={(e) => setCreditProductId(e.target.value ? Number(e.target.value) : null)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="">{isUk ? "— Оберіть товар —" : "— Select a product —"}</option>
              {Object.values(productsByCategory).flat().map((p) => (
                <option key={p.id} value={p.id}>{isUk ? p.nameUk : p.nameEn} — ₴{p.price.toLocaleString()}</option>
              ))}
            </select>
          </div>

          {creditProduct && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-4">
                {/* Down payment slider */}
                <div>
                  <label className="flex justify-between text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1">
                    <span>{isUk ? "Перший внесок" : "Down Payment"}</span>
                    <span className="text-cyan-600">{downPaymentPct}% — ₴{downAmount.toLocaleString()}</span>
                  </label>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={downPaymentPct}
                    onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                    className="w-full accent-cyan-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 dark:text-neutral-500 mt-0.5">
                    <span>0%</span><span>50%</span>
                  </div>
                </div>
                {/* Term selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark:text-neutral-300 mb-1">{isUk ? "Термін кредиту" : "Loan Term"}</label>
                  <div className="flex gap-2">
                    {[6, 12, 18, 24].map((months) => (
                      <button
                        key={months}
                        onClick={() => setCreditTerm(months)}
                        className={`flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-colors ${creditTerm === months ? "bg-cyan-500 text-white border-cyan-500" : "border-gray-300 text-gray-600 dark:text-neutral-300 hover:border-cyan-400"}`}
                      >
                        {months}{isUk ? " міс" : " mo"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Summary */}
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 flex flex-col justify-between">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-gray-600">{isUk ? "Ціна товару" : "Product Price"}:</span><span className="font-semibold">₴{creditPrice.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{isUk ? "Перший внесок" : "Down Payment"}:</span><span className="font-semibold text-green-600">₴{downAmount.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{isUk ? "Сума кредиту" : "Loan Amount"}:</span><span className="font-semibold">₴{loanAmount.toLocaleString()}</span></div>
                  <div className="border-t border-gray-200 dark:border-neutral-700 pt-2 flex justify-between">
                    <span className="font-bold text-gray-800">{isUk ? "Щомісячний платіж" : "Monthly Payment"}:</span>
                    <span className="font-bold text-xl text-cyan-600">₴{monthlyPayment.toLocaleString()}</span>
                  </div>
                  <p className="text-[10px] text-gray-400">{isUk ? "* Орієнтовний розрахунок. Ставка ~15% річних." : "* Approximate calculation. Rate ~15% p.a."}</p>
                </div>
                <button className="mt-3 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 rounded-lg text-sm transition-colors">
                  {isUk ? "Оформити кредит" : "Apply for Credit"} →
                </button>
              </div>
            </div>
          )}
          {!creditProduct && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">💳</div>
              <p className="text-sm">{isUk ? "Оберіть товар для розрахунку кредиту" : "Select a product to calculate credit terms"}</p>
            </div>
          )}
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section className="px-4 py-4">
        <h2 className="text-lg font-bold mb-3 text-gray-800">⭐ {isUk ? "Відгуки покупців" : "Customer Reviews"}</h2>
        <div className="mb-2 text-sm text-gray-500">{isUk ? "Для: Samsung Galaxy S25" : "For: Samsung Galaxy S25"}</div>
        <div className="space-y-3">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 dark:border-neutral-700 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className="font-semibold text-sm text-gray-800">{review.author}</span>
                  {review.verified && (
                    <span className="ml-2 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">✅ {isUk ? "Верифікована покупка" : "Verified Purchase"}</span>
                  )}
                </div>
                <span className="text-[10px] text-gray-400">{isUk ? review.dateUk : review.dateEn}</span>
              </div>
              <div className="text-yellow-400 text-sm mb-1.5">{"⭐".repeat(review.rating)}</div>
              <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{isUk ? review.textUk : review.textEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#111827] text-gray-300 px-4 py-8 mt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div>
            <div className="text-cyan-400 font-bold text-base mb-3">💻 TechStore UA</div>
            <p className="text-xs text-gray-400 dark:text-neutral-500 leading-relaxed">{isUk ? "Офіційний інтернет-магазин електроніки в Україні. Тільки оригінальна продукція." : "Official electronics online store in Ukraine. Original products only."}</p>
          </div>
          <div>
            <div className="font-semibold text-sm text-white mb-3">{isUk ? "Категорії" : "Categories"}</div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {["📱 Smartphones", "💻 Laptops", "📺 TVs", "🎧 Headphones", "🖥️ Tablets", "🎮 Gaming"].map((c) => (
                <li key={c}><button className="hover:text-cyan-400 transition-colors">{c}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm text-white mb-3">{isUk ? "Покупцям" : "Customers"}</div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {(isUk
                ? ["🚚 Доставка та оплата", "🔄 Повернення товару", "🛡️ Гарантія", "📞 Підтримка", "❓ FAQ"]
                : ["🚚 Shipping & Payment", "🔄 Returns", "🛡️ Warranty", "📞 Support", "❓ FAQ"]
              ).map((item) => (
                <li key={item}><button className="hover:text-cyan-400 transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-semibold text-sm text-white mb-3">{isUk ? "Про нас" : "About"}</div>
            <ul className="space-y-1.5 text-xs text-gray-400">
              {(isUk
                ? ["🏢 Про компанію", "📰 Новини", "💼 Вакансії", "🤝 Партнерам", "📋 Оферта"]
                : ["🏢 About Company", "📰 News", "💼 Careers", "🤝 Partners", "📋 Terms"]
              ).map((item) => (
                <li key={item}><button className="hover:text-cyan-400 transition-colors">{item}</button></li>
              ))}
            </ul>
          </div>
        </div>
        {/* Payment methods */}
        <div className="border-t border-gray-700 pt-4 mb-4">
          <div className="text-xs text-gray-500 dark:text-neutral-400 mb-2">{isUk ? "Способи оплати:" : "Payment Methods:"}</div>
          <div className="flex flex-wrap gap-2">
            {paymentMethods.map((pm) => (
              <span key={pm} className="text-xs bg-gray-800 px-2 py-1 rounded border border-gray-700 text-gray-300">{pm}</span>
            ))}
          </div>
        </div>
        {/* Guarantees */}
        <div className="flex flex-wrap gap-4 mb-4">
          {footerGuarantees.map((g) => (
            <div key={g.en} className="flex items-center gap-1.5 text-xs text-gray-400">
              <span>{g.emoji}</span>
              <span>{isUk ? g.uk : g.en}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 pt-4 flex items-center justify-between text-[10px] text-gray-500">
          <span>© 2026 TechStore UA. {isUk ? "Всі права захищені." : "All rights reserved."}</span>
          <span>{isUk ? "Зроблено з ❤️ для України" : "Made with ❤️ for Ukraine"}</span>
        </div>
      </footer>

      {/* ── QUICK VIEW MODAL ── */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setQuickViewProduct(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-bold text-gray-900 dark:text-white text-base pr-4">{isUk ? quickViewProduct.nameUk : quickViewProduct.nameEn}</h3>
                <button onClick={() => setQuickViewProduct(null)} className="text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:text-neutral-300 text-xl shrink-0">✕</button>
              </div>
              {/* Product image placeholder */}
              <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl h-36 flex items-center justify-center text-6xl mb-4">{quickViewProduct.emoji}</div>
              {/* Price & stock */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-gray-900">₴{quickViewProduct.price.toLocaleString()}</span>
                  {quickViewProduct.oldPrice && <span className="text-sm text-gray-400 dark:text-neutral-500 line-through">₴{quickViewProduct.oldPrice.toLocaleString()}</span>}
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${quickViewProduct.inStock ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}`}>
                  {quickViewProduct.inStock ? (isUk ? "✅ В наявності" : "✅ In stock") : (isUk ? "⏳ Передзамовлення" : "⏳ Pre-order")}
                </span>
              </div>
              {/* Specs table */}
              <div className="border border-gray-200 dark:border-neutral-700 rounded-xl overflow-hidden mb-4">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(isUk ? quickViewProduct.specsUk : quickViewProduct.specsEn).map(([key, val], i) => (
                      <tr key={key} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                        <td className="py-2 px-3 font-medium text-gray-500 dark:text-neutral-400 text-xs w-2/5">{key}</td>
                        <td className="py-2 px-3 text-gray-800 dark:text-neutral-200 text-xs">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Delivery & warranty */}
              <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                <div className="bg-blue-50 rounded-lg p-2.5">
                  <div className="font-semibold text-blue-700 mb-0.5">🚚 {isUk ? "Доставка" : "Delivery"}</div>
                  <div className="text-blue-600">{isUk ? "Нова Пошта: 1–2 дні" : "Nova Post: 1–2 days"}</div>
                  <div className="text-blue-600">{isUk ? "Кур'єр: сьогодні/завтра" : "Courier: today/tomorrow"}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-2.5">
                  <div className="font-semibold text-green-700 mb-0.5">🛡️ {isUk ? "Гарантія" : "Warranty"}</div>
                  <div className="text-green-600">{isUk ? "Офіційна: 12 місяців" : "Official: 12 months"}</div>
                  <div className="text-green-600">{isUk ? "Сервіс: по всій Україні" : "Service: all Ukraine"}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
                >
                  🛒 {isUk ? "Додати в кошик" : "Add to Cart"}
                </button>
                <button
                  onClick={() => { setCreditProductId(quickViewProduct.id); setQuickViewProduct(null); }}
                  className="px-4 border border-cyan-500 text-cyan-600 hover:bg-cyan-50 font-semibold py-2.5 rounded-xl text-sm transition-colors"
                >
                  💳 {isUk ? "Кредит" : "Credit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMPARE BAR + TABLE ── */}
      {compareList.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#111827] border-t border-gray-700 shadow-xl">
          <div className="px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-white text-xs font-semibold">⚖️ {isUk ? "Порівняння" : "Compare"} ({compareList.length}/4):</span>
              <div className="flex gap-2">
                {compareList.map((p) => (
                  <div key={p.id} className="flex items-center gap-1 bg-gray-700 rounded-lg px-2 py-1">
                    <span className="text-xs">{p.emoji}</span>
                    <span className="text-xs text-gray-300 max-w-[80px] truncate">{isUk ? p.nameUk : p.nameEn}</span>
                    <button onClick={() => toggleCompare(p)} className="text-gray-400 dark:text-neutral-500 hover:text-red-400 text-xs ml-1">✕</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCompare((v) => !v)}
                className="text-xs bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-3 py-1.5 rounded-lg"
              >
                {showCompare ? (isUk ? "Сховати" : "Hide") : (isUk ? "Порівняти" : "Compare")}
              </button>
              <button onClick={() => setCompareList([])} className="text-xs text-gray-400 dark:text-neutral-500 hover:text-red-400 px-2 py-1.5">
                {isUk ? "Очистити" : "Clear"}
              </button>
            </div>
          </div>
          {/* Comparison table */}
          {showCompare && (
            <div className="px-4 pb-4 max-h-72 overflow-y-auto">
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-900">
                      <th className="text-left py-2 px-3 text-gray-400 dark:text-neutral-500 font-medium w-1/5">{isUk ? "Характеристика" : "Spec"}</th>
                      {compareList.map((p) => (
                        <th key={p.id} className="py-2 px-3 text-center text-cyan-400 font-semibold">
                          <div>{p.emoji}</div>
                          <div className="text-[10px] text-gray-300 font-normal max-w-[100px] truncate mx-auto">{isUk ? p.nameUk : p.nameEn}</div>
                        </th>
                      ))}
                    </tr>
                    <tr className="bg-gray-850 border-t border-gray-700">
                      <td className="py-2 px-3 text-gray-400">{isUk ? "Ціна" : "Price"}</td>
                      {compareList.map((p) => {
                        const minPrice = Math.min(...compareList.map((x) => x.price));
                        return (
                          <td key={p.id} className={`py-2 px-3 text-center font-bold ${p.price === minPrice ? "text-green-400" : "text-gray-300"}`}>
                            ₴{p.price.toLocaleString()}
                          </td>
                        );
                      })}
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-2 px-3 text-gray-400">{isUk ? "Рейтинг" : "Rating"}</td>
                      {compareList.map((p) => {
                        const maxRating = Math.max(...compareList.map((x) => x.rating));
                        return (
                          <td key={p.id} className={`py-2 px-3 text-center font-semibold ${p.rating === maxRating ? "text-yellow-400" : "text-gray-300"}`}>
                            ⭐ {p.rating}
                          </td>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {compareSpecKeys.map((key, idx) => (
                      <tr key={key} className={`border-t border-gray-700 ${idx % 2 === 0 ? "bg-gray-800" : "bg-gray-750"}`}>
                        <td className="py-2 px-3 text-gray-400">{key}</td>
                        {compareList.map((p) => {
                          const val = isUk ? p.specsUk[key] : p.specsEn[key];
                          return (
                            <td key={p.id} className="py-2 px-3 text-center text-gray-300">{val ?? "—"}</td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CART SIDEBAR ── */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartOpen(false)} />
          <div className="relative bg-white w-full max-w-sm h-full flex flex-col shadow-2xl">
            {/* Cart header */}
            <div className="bg-[#111827] text-white px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-base">🛒 {isUk ? "Кошик" : "Cart"} ({cartCount})</h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-300 hover:text-white text-xl">✕</button>
            </div>
            {/* Cart items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <div className="text-5xl mb-3">🛒</div>
                  <p className="text-sm">{isUk ? "Кошик порожній" : "Your cart is empty"}</p>
                  <button onClick={() => setCartOpen(false)} className="mt-4 text-cyan-600 text-sm underline">
                    {isUk ? "Перейти до каталогу" : "Go to catalog"}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 bg-gray-50 dark:bg-neutral-900 rounded-xl p-3 border border-gray-200">
                      <div className="text-2xl shrink-0">{item.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-gray-800 dark:text-neutral-200 truncate">{item.name}</div>
                        <div className="text-xs text-cyan-600 font-bold">₴{item.price.toLocaleString()}</div>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => changeQty(item.id, -1)} className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 text-xs font-bold flex items-center justify-center">−</button>
                        <span className="w-5 text-center text-xs font-semibold">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)} className="w-6 h-6 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-red-400 text-sm shrink-0">🗑️</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Cart footer */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-200 dark:border-neutral-700 p-4 space-y-3">
                {/* Promo code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder={isUk ? "Промокод" : "Promo code"}
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <button
                    onClick={() => promoCode.length > 0 && setPromoApplied(true)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors ${promoApplied ? "bg-green-500 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`}
                  >
                    {promoApplied ? "✓" : (isUk ? "Застосувати" : "Apply")}
                  </button>
                </div>
                {promoApplied && (
                  <div className="text-xs text-green-600 font-medium">✅ {isUk ? "Знижка 10% застосована!" : "10% discount applied!"}</div>
                )}
                {/* Totals */}
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>{isUk ? "Сума" : "Subtotal"}:</span>
                    <span>₴{cartTotal.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>{isUk ? "Знижка" : "Discount"}:</span>
                      <span>−₴{(cartTotal - discountedTotal).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 dark:text-white text-base border-t border-gray-200 dark:border-neutral-700 pt-1">
                    <span>{isUk ? "Разом" : "Total"}:</span>
                    <span className="text-cyan-600">₴{discountedTotal.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-xl text-sm transition-colors">
                  {isUk ? "Оформити замовлення →" : "Checkout →"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
