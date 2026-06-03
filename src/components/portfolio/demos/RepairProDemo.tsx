"use client";
import { useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// ── Data ────────────────────────────────────────────────────────────────────

const deviceTypes = [
  { key: "smartphone", en: "Smartphone", uk: "Смартфон", emoji: "📱" },
  { key: "laptop",     en: "Laptop",     uk: "Ноутбук",  emoji: "💻" },
  { key: "tablet",     en: "Tablet",     uk: "Планшет",  emoji: "🖥️" },
  { key: "smartwatch", en: "Smartwatch", uk: "Смарт-годинник", emoji: "⌚" },
];

const brands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Other"];

const issues = [
  { key: "no_power",       en: "Won't turn on",   uk: "Не вмикається" },
  { key: "cracked_screen", en: "Cracked screen",  uk: "Розбитий екран" },
  { key: "no_charge",      en: "Won't charge",    uk: "Не заряджається" },
  { key: "keyboard",       en: "Keyboard",        uk: "Клавіатура" },
  { key: "water_damage",   en: "Water damage",    uk: "Потрапила вода" },
  { key: "battery",        en: "Battery",         uk: "Акумулятор" },
  { key: "other",          en: "Other",           uk: "Інше" },
];

type PriceResult = { priceMin: number; priceMax: number; timeEn: string; timeUk: string };

const priceMatrix: Record<string, Record<string, Record<string, PriceResult>>> = {
  smartphone: {
    Apple: {
      cracked_screen: { priceMin: 3200, priceMax: 3200, timeEn: "2 hours", timeUk: "2 години" },
      battery:        { priceMin: 890,  priceMax: 890,  timeEn: "1 hour",  timeUk: "1 година" },
      no_charge:      { priceMin: 650,  priceMax: 650,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 800,  priceMax: 1800, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 1200, priceMax: 2500, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 600,  priceMax: 900,  timeEn: "1 hour",  timeUk: "1 година" },
      other:          { priceMin: 500,  priceMax: 2000, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Samsung: {
      cracked_screen: { priceMin: 2800, priceMax: 2800, timeEn: "2 hours", timeUk: "2 години" },
      battery:        { priceMin: 750,  priceMax: 750,  timeEn: "1 hour",  timeUk: "1 година" },
      no_charge:      { priceMin: 650,  priceMax: 650,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 700,  priceMax: 1600, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 1000, priceMax: 2200, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 550,  priceMax: 850,  timeEn: "1 hour",  timeUk: "1 година" },
      other:          { priceMin: 450,  priceMax: 1800, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Xiaomi: {
      cracked_screen: { priceMin: 1800, priceMax: 2400, timeEn: "2 hours", timeUk: "2 години" },
      battery:        { priceMin: 650,  priceMax: 700,  timeEn: "1 hour",  timeUk: "1 година" },
      no_charge:      { priceMin: 550,  priceMax: 600,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 600,  priceMax: 1400, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 900,  priceMax: 1800, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 400,  priceMax: 700,  timeEn: "1 hour",  timeUk: "1 година" },
      other:          { priceMin: 400,  priceMax: 1500, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Huawei: {
      cracked_screen: { priceMin: 2000, priceMax: 2600, timeEn: "2 hours", timeUk: "2 години" },
      battery:        { priceMin: 700,  priceMax: 750,  timeEn: "1 hour",  timeUk: "1 година" },
      no_charge:      { priceMin: 600,  priceMax: 650,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 700,  priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 950,  priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 450,  priceMax: 750,  timeEn: "1 hour",  timeUk: "1 година" },
      other:          { priceMin: 400,  priceMax: 1600, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Other: {
      cracked_screen: { priceMin: 1500, priceMax: 2800, timeEn: "2 hours", timeUk: "2 години" },
      battery:        { priceMin: 600,  priceMax: 800,  timeEn: "1 hour",  timeUk: "1 година" },
      no_charge:      { priceMin: 500,  priceMax: 700,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 500,  priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 800,  priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 400,  priceMax: 700,  timeEn: "1 hour",  timeUk: "1 година" },
      other:          { priceMin: 300,  priceMax: 1500, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
  },
  laptop: {
    Apple: {
      cracked_screen: { priceMin: 3500, priceMax: 4500, timeEn: "4 hours", timeUk: "4 години" },
      keyboard:       { priceMin: 1800, priceMax: 2800, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 1000, priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" },
      no_power:       { priceMin: 1000, priceMax: 3000, timeEn: "3 hours", timeUk: "3 години" },
      water_damage:   { priceMin: 1500, priceMax: 4000, timeEn: "4 hours", timeUk: "4 години" },
      no_charge:      { priceMin: 800,  priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 500,  priceMax: 3000, timeEn: "2–4 hours", timeUk: "2–4 години" },
    },
    Samsung: {
      cracked_screen: { priceMin: 2500, priceMax: 3800, timeEn: "4 hours", timeUk: "4 години" },
      keyboard:       { priceMin: 1200, priceMax: 2200, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 800,  priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" },
      no_power:       { priceMin: 900,  priceMax: 2500, timeEn: "3 hours", timeUk: "3 години" },
      water_damage:   { priceMin: 1200, priceMax: 3500, timeEn: "4 hours", timeUk: "4 години" },
      no_charge:      { priceMin: 700,  priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 500,  priceMax: 2500, timeEn: "2–4 hours", timeUk: "2–4 години" },
    },
    Xiaomi: {
      cracked_screen: { priceMin: 2000, priceMax: 3200, timeEn: "4 hours", timeUk: "4 години" },
      keyboard:       { priceMin: 1000, priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 700,  priceMax: 1100, timeEn: "2 hours", timeUk: "2 години" },
      no_power:       { priceMin: 800,  priceMax: 2200, timeEn: "3 hours", timeUk: "3 години" },
      water_damage:   { priceMin: 1000, priceMax: 3000, timeEn: "4 hours", timeUk: "4 години" },
      no_charge:      { priceMin: 600,  priceMax: 1000, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 400,  priceMax: 2200, timeEn: "2–4 hours", timeUk: "2–4 години" },
    },
    Huawei: {
      cracked_screen: { priceMin: 2200, priceMax: 3500, timeEn: "4 hours", timeUk: "4 години" },
      keyboard:       { priceMin: 1100, priceMax: 2100, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 750,  priceMax: 1150, timeEn: "2 hours", timeUk: "2 години" },
      no_power:       { priceMin: 850,  priceMax: 2300, timeEn: "3 hours", timeUk: "3 години" },
      water_damage:   { priceMin: 1100, priceMax: 3200, timeEn: "4 hours", timeUk: "4 години" },
      no_charge:      { priceMin: 650,  priceMax: 1050, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 450,  priceMax: 2300, timeEn: "2–4 hours", timeUk: "2–4 години" },
    },
    Other: {
      cracked_screen: { priceMin: 2500, priceMax: 4500, timeEn: "4 hours", timeUk: "4 години" },
      keyboard:       { priceMin: 1200, priceMax: 2800, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 800,  priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" },
      no_power:       { priceMin: 800,  priceMax: 2500, timeEn: "3 hours", timeUk: "3 години" },
      water_damage:   { priceMin: 1000, priceMax: 3500, timeEn: "4 hours", timeUk: "4 години" },
      no_charge:      { priceMin: 600,  priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 400,  priceMax: 2500, timeEn: "2–4 hours", timeUk: "2–4 години" },
    },
  },
  tablet: {
    Apple: {
      cracked_screen: { priceMin: 2800, priceMax: 3800, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 900,  priceMax: 1100, timeEn: "2 hours", timeUk: "2 години" },
      no_charge:      { priceMin: 700,  priceMax: 900,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 900,  priceMax: 2000, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 1200, priceMax: 2800, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 700,  priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 500,  priceMax: 2000, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Samsung: {
      cracked_screen: { priceMin: 2000, priceMax: 3200, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 750,  priceMax: 950,  timeEn: "2 hours", timeUk: "2 години" },
      no_charge:      { priceMin: 600,  priceMax: 800,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 800,  priceMax: 1800, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 1000, priceMax: 2400, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 600,  priceMax: 1000, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 400,  priceMax: 1800, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Xiaomi: { cracked_screen: { priceMin: 1600, priceMax: 2600, timeEn: "3 hours", timeUk: "3 години" }, battery: { priceMin: 650, priceMax: 850, timeEn: "2 hours", timeUk: "2 години" }, no_charge: { priceMin: 550, priceMax: 750, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 700, priceMax: 1600, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 900, priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" }, keyboard: { priceMin: 500, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, other: { priceMin: 400, priceMax: 1600, timeEn: "1–3 hours", timeUk: "1–3 години" } },
    Huawei: { cracked_screen: { priceMin: 1800, priceMax: 2800, timeEn: "3 hours", timeUk: "3 години" }, battery: { priceMin: 700, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, no_charge: { priceMin: 580, priceMax: 780, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 750, priceMax: 1700, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 950, priceMax: 2200, timeEn: "3 hours", timeUk: "3 години" }, keyboard: { priceMin: 550, priceMax: 950, timeEn: "2 hours", timeUk: "2 години" }, other: { priceMin: 400, priceMax: 1700, timeEn: "1–3 hours", timeUk: "1–3 години" } },
    Other:  { cracked_screen: { priceMin: 1400, priceMax: 2800, timeEn: "3 hours", timeUk: "3 години" }, battery: { priceMin: 600, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, no_charge: { priceMin: 500, priceMax: 750, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 600, priceMax: 1600, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 800, priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" }, keyboard: { priceMin: 450, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, other: { priceMin: 300, priceMax: 1600, timeEn: "1–3 hours", timeUk: "1–3 години" } },
  },
  smartwatch: {
    Apple: {
      cracked_screen: { priceMin: 2200, priceMax: 3000, timeEn: "3 hours", timeUk: "3 години" },
      battery:        { priceMin: 900,  priceMax: 1100, timeEn: "2 hours", timeUk: "2 години" },
      no_charge:      { priceMin: 700,  priceMax: 900,  timeEn: "1 hour",  timeUk: "1 година" },
      no_power:       { priceMin: 900,  priceMax: 1800, timeEn: "2 hours", timeUk: "2 години" },
      water_damage:   { priceMin: 1200, priceMax: 2500, timeEn: "3 hours", timeUk: "3 години" },
      keyboard:       { priceMin: 600,  priceMax: 1000, timeEn: "2 hours", timeUk: "2 години" },
      other:          { priceMin: 500,  priceMax: 1800, timeEn: "1–3 hours", timeUk: "1–3 години" },
    },
    Samsung: { cracked_screen: { priceMin: 1500, priceMax: 2200, timeEn: "3 hours", timeUk: "3 години" }, battery: { priceMin: 700, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, no_charge: { priceMin: 550, priceMax: 750, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 700, priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 900, priceMax: 2000, timeEn: "3 hours", timeUk: "3 години" }, keyboard: { priceMin: 500, priceMax: 900, timeEn: "2 hours", timeUk: "2 години" }, other: { priceMin: 400, priceMax: 1500, timeEn: "1–3 hours", timeUk: "1–3 години" } },
    Xiaomi:  { cracked_screen: { priceMin: 900,  priceMax: 1600, timeEn: "2 hours", timeUk: "2 години" }, battery: { priceMin: 500, priceMax: 700, timeEn: "1 hour", timeUk: "1 година" }, no_charge: { priceMin: 400, priceMax: 600, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 500, priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 700, priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" }, keyboard: { priceMin: 400, priceMax: 700, timeEn: "1 hour", timeUk: "1 година" }, other: { priceMin: 300, priceMax: 1200, timeEn: "1–2 hours", timeUk: "1–2 години" } },
    Huawei:  { cracked_screen: { priceMin: 1000, priceMax: 1800, timeEn: "2 hours", timeUk: "2 години" }, battery: { priceMin: 550, priceMax: 750, timeEn: "1 hour", timeUk: "1 година" }, no_charge: { priceMin: 450, priceMax: 650, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 550, priceMax: 1300, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 750, priceMax: 1600, timeEn: "2 hours", timeUk: "2 години" }, keyboard: { priceMin: 420, priceMax: 720, timeEn: "1 hour", timeUk: "1 година" }, other: { priceMin: 320, priceMax: 1300, timeEn: "1–2 hours", timeUk: "1–2 години" } },
    Other:   { cracked_screen: { priceMin: 800,  priceMax: 1800, timeEn: "2 hours", timeUk: "2 години" }, battery: { priceMin: 450, priceMax: 700, timeEn: "1 hour", timeUk: "1 година" }, no_charge: { priceMin: 380, priceMax: 600, timeEn: "1 hour", timeUk: "1 година" }, no_power: { priceMin: 450, priceMax: 1200, timeEn: "2 hours", timeUk: "2 години" }, water_damage: { priceMin: 600, priceMax: 1500, timeEn: "2 hours", timeUk: "2 години" }, keyboard: { priceMin: 380, priceMax: 680, timeEn: "1 hour", timeUk: "1 година" }, other: { priceMin: 280, priceMax: 1200, timeEn: "1–2 hours", timeUk: "1–2 години" } },
  },
};

const catalogData: Record<string, { repairs: { nameEn: string; nameUk: string; price: string; timeEn: string; timeUk: string; warrantyEn: string; warrantyUk: string; top?: boolean }[]; brands: string[] }> = {
  smartphones: {
    brands: ["All", "Apple", "Samsung", "Xiaomi", "Huawei"],
    repairs: [
      { nameEn: "Screen replacement (iPhone 14)", nameUk: "Заміна екрану (iPhone 14)", price: "₴3,200", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Screen replacement (Samsung S23)", nameUk: "Заміна екрану (Samsung S23)", price: "₴2,800", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Battery replacement (iPhone)", nameUk: "Заміна батареї (iPhone)", price: "₴890", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Battery replacement (Samsung)", nameUk: "Заміна батареї (Samsung)", price: "₴750", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Charging port repair", nameUk: "Ремонт роз'єму зарядки", price: "₴650", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Water damage recovery", nameUk: "Відновлення після води", price: "₴900–2,500", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
    ],
  },
  laptops: {
    brands: ["All", "Apple", "Dell", "Lenovo", "ASUS"],
    repairs: [
      { nameEn: "Screen replacement", nameUk: "Заміна матриці", price: "₴2,500–4,500", timeEn: "4h", timeUk: "4 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Keyboard replacement", nameUk: "Заміна клавіатури", price: "₴1,200–2,800", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Battery replacement", nameUk: "Заміна акумулятора", price: "₴800–1,500", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "SSD upgrade", nameUk: "Апгрейд SSD", price: "₴500 + parts", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Charging port repair", nameUk: "Ремонт роз'єму зарядки", price: "₴700–1,200", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Water damage service", nameUk: "Сервіс після потрапляння води", price: "₴1,000–3,500", timeEn: "4h", timeUk: "4 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
    ],
  },
  tablets: {
    brands: ["All", "Apple", "Samsung", "Huawei", "Lenovo"],
    repairs: [
      { nameEn: "Screen replacement (iPad)", nameUk: "Заміна екрану (iPad)", price: "₴2,800–3,800", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Screen replacement (Samsung)", nameUk: "Заміна екрану (Samsung)", price: "₴2,000–3,200", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Battery replacement", nameUk: "Заміна акумулятора", price: "₴750–1,100", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Charging port repair", nameUk: "Ремонт роз'єму зарядки", price: "₴600–900", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Software restore", nameUk: "Відновлення програмного забезпечення", price: "₴400–800", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Water damage recovery", nameUk: "Відновлення після води", price: "₴900–2,200", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
    ],
  },
  smartwatches: {
    brands: ["All", "Apple", "Samsung", "Xiaomi", "Garmin"],
    repairs: [
      { nameEn: "Screen replacement (Apple Watch)", nameUk: "Заміна екрану (Apple Watch)", price: "₴2,200–3,000", timeEn: "3h", timeUk: "3 год", warrantyEn: "90 days", warrantyUk: "90 днів", top: true },
      { nameEn: "Screen replacement (Samsung)", nameUk: "Заміна екрану (Samsung)", price: "₴1,500–2,200", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Battery replacement", nameUk: "Заміна акумулятора", price: "₴500–1,100", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Crown / button repair", nameUk: "Ремонт кнопки / корони", price: "₴600–1,000", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Water damage recovery", nameUk: "Відновлення після води", price: "₴700–2,000", timeEn: "2h", timeUk: "2 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
      { nameEn: "Strap connector repair", nameUk: "Ремонт кріплення ремінця", price: "₴300–600", timeEn: "1h", timeUk: "1 год", warrantyEn: "90 days", warrantyUk: "90 днів" },
    ],
  },
};

const trackingMockData: Record<string, { currentStage: number; estimatedEn: string; estimatedUk: string; deviceEn: string; deviceUk: string; masterEn: string; masterUk: string }> = {
  "RP-1042": { currentStage: 4, estimatedEn: "Today, 18:00", estimatedUk: "Сьогодні, 18:00", deviceEn: "iPhone 14 Pro – screen replacement", deviceUk: "iPhone 14 Pro – заміна екрану", masterEn: "Oleksiy K.", masterUk: "Олексій К." },
  "RP-0987": { currentStage: 2, estimatedEn: "Tomorrow, 12:00", estimatedUk: "Завтра, 12:00", deviceEn: "MacBook Air M2 – keyboard", deviceUk: "MacBook Air M2 – клавіатура", masterEn: "Ivan S.", masterUk: "Іван С." },
  "RP-2201": { currentStage: 5, estimatedEn: "Ready for pickup", estimatedUk: "Готовий до видачі", deviceEn: "Samsung Galaxy S23 – battery", deviceUk: "Samsung Galaxy S23 – батарея", masterEn: "Maria V.", masterUk: "Марія В." },
  "RP-3310": { currentStage: 1, estimatedEn: "2 days", estimatedUk: "2 дні", deviceEn: "iPad Pro 12.9 – screen", deviceUk: "iPad Pro 12.9 – екран", masterEn: "Pending assignment", masterUk: "Очікує призначення" },
};

const trackingStages = [
  { en: "Received",       uk: "Прийнято" },
  { en: "Diagnostics",    uk: "Діагностика" },
  { en: "Awaiting Parts", uk: "Очікує деталей" },
  { en: "Repair",         uk: "Ремонт" },
  { en: "Ready",          uk: "Готово" },
  { en: "Handed Over",    uk: "Видано" },
];

const locations = [
  { id: 1, nameEn: "Central — Dmytro Yavornytskoho Ave, 99", nameUk: "Центр — просп. Дмитра Яворницького, 99", hoursEn: "Mon–Sat 9:00–19:00", hoursUk: "Пн–Сб 9:00–19:00" },
  { id: 2, nameEn: "Sobornyi — Soborna St, 34A", nameUk: "Соборний — вул. Соборна, 34А", hoursEn: "Mon–Fri 10:00–18:00", hoursUk: "Пн–Пт 10:00–18:00" },
  { id: 3, nameEn: "Industrialnyi — Metalurhiv St, 12", nameUk: "Індустріальний — вул. Металургів, 12", hoursEn: "Mon–Sat 9:00–20:00", hoursUk: "Пн–Сб 9:00–20:00" },
];

const masters = [
  { id: 1, initials: "ОК", nameEn: "Oleksiy Kovalenko", nameUk: "Олексій Коваленко", specEn: "Smartphones · Apple specialist", specUk: "Смартфони · Спеціаліст Apple", rating: 4.9, reviews: 312, color: "bg-orange-500" },
  { id: 2, initials: "ІС", nameEn: "Ivan Sydorenko",   nameUk: "Іван Сидоренко",   specEn: "Laptops · Data recovery",        specUk: "Ноутбуки · Відновлення даних",  rating: 4.8, reviews: 198, color: "bg-blue-600" },
  { id: 3, initials: "МВ", nameEn: "Maria Vasylenko",  nameUk: "Марія Василенко",  specEn: "Tablets · Smartwatches",          specUk: "Планшети · Смарт-годинники",    rating: 4.9, reviews: 245, color: "bg-emerald-600" },
];

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const reviews = [
  { nameEn: "Anton M.", nameUk: "Антон М.", rating: 5, textEn: "Replaced my iPhone screen in 2 hours. Works perfectly, 90-day warranty — exactly as promised. Will come back!", textUk: "Замінили екран iPhone за 2 години. Працює ідеально, гарантія 90 днів — все як обіцяли. Повернусь ще!" },
  { nameEn: "Oksana P.", nameUk: "Оксана П.", rating: 5, textEn: "Fast diagnostics, transparent pricing, no hidden fees. Fixed my MacBook after water damage. Highly recommend!", textUk: "Швидка діагностика, прозорі ціни, без прихованих доплат. Відновили MacBook після води. Дуже рекомендую!" },
  { nameEn: "Dmytro K.", nameUk: "Дмитро К.", rating: 5, textEn: "Ordered tracking worked great — I could see every step. Samsung battery replaced, like new. Great service!", textUk: "Трекінг замовлення спрацював — бачив кожен крок. Батарея Samsung замінена, як нова. Чудовий сервіс!" },
  { nameEn: "Iryna L.", nameUk: "Ірина Л.", rating: 4, textEn: "Polite staff, clean workshop. Tablet fixed faster than expected. Slight wait at the counter but worth it.", textUk: "Ввічливий персонал, чиста майстерня. Планшет відремонтували швидше за обіцяне. Невелика черга, але варто." },
];

// ── Component ────────────────────────────────────────────────────────────────

export function RepairProDemo({ lang }: { lang: string }) {
  const isUk = lang === "uk";

  // Calculator
  const [calcStep, setCalcStep]   = useState(1);
  const [calcDevice, setCalcDevice] = useState("");
  const [calcBrand, setCalcBrand]   = useState("");
  const [calcIssue, setCalcIssue]   = useState("");

  // Tracking
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingResult, setTrackingResult] = useState<null | (typeof trackingMockData)[string] & { found: boolean }>(null);

  // Booking
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState<{
    location: number | null;
    master: number | null;
    date: string;
    time: string;
    name: string;
    phone: string;
    device: string;
    confirmed: boolean;
  }>({ location: null, master: null, date: "", time: "", name: "", phone: "", device: "", confirmed: false });

  // Catalog
  const [activeCategory, setActiveCategory] = useState("smartphones");
  const [activeBrand, setActiveBrand] = useState("All");

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  // Helpers
  const getCalcResult = (): PriceResult | null => {
    if (!calcDevice || !calcBrand || !calcIssue) return null;
    return priceMatrix[calcDevice]?.[calcBrand]?.[calcIssue] ?? null;
  };

  const handleTrack = () => {
    const key = trackingNumber.trim().toUpperCase();
    const found = trackingMockData[key];
    if (found) {
      setTrackingResult({ ...found, found: true });
    } else {
      setTrackingResult({ found: false, currentStage: 0, estimatedEn: "", estimatedUk: "", deviceEn: "", deviceUk: "", masterEn: "", masterUk: "" });
    }
  };

  const catalogRepairs = catalogData[activeCategory]?.repairs ?? [];
  const filteredRepairs = activeBrand === "All" ? catalogRepairs : catalogRepairs.filter((r) =>
    (isUk ? r.nameUk : r.nameEn).toLowerCase().includes(activeBrand.toLowerCase())
  );
  const catalogBrands = catalogData[activeCategory]?.brands ?? [];

  const calcResult = getCalcResult();

  const bookingLocationObj = locations.find((l) => l.id === bookingData.location);
  const bookingMasterObj   = masters.find((m) => m.id === bookingData.master);

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white text-[#1F2937] font-sans">

      {/* ── NAV ── */}
      <nav className="bg-white border-b border-gray-100 dark:border-neutral-700 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <EmojiIcon emoji="🔧" className="w-7 h-7" />
            <span className="font-bold text-[#1F2937] text-lg tracking-tight">RepairPro</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <span className="cursor-pointer hover:text-[#F97316] transition-colors">{isUk ? "Послуги" : "Services"}</span>
            <span className="cursor-pointer hover:text-[#F97316] transition-colors">{isUk ? "Ціни" : "Prices"}</span>
            <span className="cursor-pointer hover:text-[#F97316] transition-colors">{isUk ? "Відстеження" : "Tracking"}</span>
            <span className="cursor-pointer hover:text-[#F97316] transition-colors">{isUk ? "Контакти" : "Contact"}</span>
          </div>
          <button className="bg-[#F97316] hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            {isUk ? "Записатись" : "Book Repair"}
          </button>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════════════════
          1. HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-linear-to-br from-gray-50 to-orange-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <p className="text-[#F97316] font-semibold text-sm mb-3 uppercase tracking-wider">
              {isUk ? "Сервісний центр №1 в Дніпрі" : "Service Center #1 in Dnipro"}
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] leading-tight mb-4">
              {isUk
                ? "Швидкий ремонт.\nЧесна ціна.\nГарантія."
                : "Fast Repair.\nFair Price.\nWarranty."}
            </h1>
            <p className="text-gray-500 dark:text-neutral-400 text-lg mb-8">
              {isUk
                ? "Ремонтуємо смартфони, ноутбуки, планшети та смарт-годинники. Безкоштовна діагностика 30 хв."
                : "We repair smartphones, laptops, tablets and smartwatches. Free 30-min diagnostics."}
            </p>

            {/* Search bar */}
            <div className="flex gap-2 mb-10">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isUk ? "Введіть пристрій або модель…" : "Enter device or model…"}
                className="flex-1 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] bg-white"
              />
              <button className="bg-[#F97316] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shrink-0">
                {isUk ? "Знайти" : "Search"}
              </button>
            </div>

            {/* Trust blocks */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "⚡", en: "Free 30-min diagnostics",   uk: "Безкоштовна діагностика 30 хв" },
                { icon: "✅", en: "90-day warranty",            uk: "Гарантія 90 днів" },
                { icon: "📍", en: "3 locations in Dnipro",      uk: "3 точки в Дніпрі" },
              ].map((t) => (
                <div key={t.en} className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-xl px-4 py-2 shadow-sm border border-gray-100 dark:border-neutral-700 text-sm font-medium">
                  <span>{t.icon}</span>
                  <span>{isUk ? t.uk : t.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Counter */}
          <div className="mt-12 inline-flex items-center gap-4 bg-[#1F2937] text-white rounded-2xl px-8 py-5 shadow-lg">
            <span className="text-4xl font-extrabold text-[#F97316]">8,240+</span>
            <span className="text-base font-medium leading-tight">
              {isUk ? "ремонтів\nвиконано" : "repairs\ncompleted"}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          2. REPAIR COST CALCULATOR
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{isUk ? "Калькулятор вартості ремонту" : "Repair Cost Calculator"}</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center text-sm mb-8">{isUk ? "Дізнайтесь орієнтовну вартість за 3 кроки" : "Get an instant price estimate in 3 steps"}</p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  calcStep > s ? "bg-[#F97316] text-white" : calcStep === s ? "bg-[#F97316] text-white ring-4 ring-orange-100" : "bg-gray-100 dark:bg-neutral-800 text-gray-400"
                }`}>{calcStep > s ? "✓" : s}</div>
                {s < 3 && <div className={`w-12 h-1 rounded-full ${calcStep > s ? "bg-[#F97316]" : "bg-gray-100"}`} />}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100">

            {/* Step 1: Device */}
            {calcStep === 1 && (
              <div>
                <p className="font-semibold mb-4 text-center">{isUk ? "Крок 1: Оберіть тип пристрою" : "Step 1: Select device type"}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {deviceTypes.map((d) => (
                    <button
                      key={d.key}
                      onClick={() => { setCalcDevice(d.key); setCalcBrand(""); setCalcIssue(""); setCalcStep(2); }}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all font-medium text-sm ${
                        calcDevice === d.key ? "border-[#F97316] bg-orange-50 text-[#F97316]" : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-200"
                      }`}
                    >
                      <EmojiIcon emoji={d.emoji} className="w-8 h-8" />
                      <span>{isUk ? d.uk : d.en}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Brand */}
            {calcStep === 2 && (
              <div>
                <p className="font-semibold mb-4 text-center">{isUk ? "Крок 2: Оберіть бренд" : "Step 2: Select brand"}</p>
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => { setCalcBrand(b); setCalcStep(3); }}
                      className={`px-5 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                        calcBrand === b ? "border-[#F97316] bg-orange-50 text-[#F97316]" : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-300"
                      }`}
                    >
                      {b === "Other" ? (isUk ? "Інший" : "Other") : b}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCalcStep(1)} className="text-sm text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:text-neutral-300 flex items-center gap-1 mx-auto">
                  ← {isUk ? "Назад" : "Back"}
                </button>
              </div>
            )}

            {/* Step 3: Issue */}
            {calcStep === 3 && (
              <div>
                <p className="font-semibold mb-4 text-center">{isUk ? "Крок 3: Оберіть проблему" : "Step 3: Select issue"}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {issues.map((i) => (
                    <button
                      key={i.key}
                      onClick={() => setCalcIssue(i.key)}
                      className={`px-4 py-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                        calcIssue === i.key ? "border-[#F97316] bg-orange-50 text-[#F97316]" : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-200"
                      }`}
                    >
                      {isUk ? i.uk : i.en}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCalcStep(2)} className="text-sm text-gray-400 dark:text-neutral-500 hover:text-gray-600 dark:text-neutral-300 flex items-center gap-1 mx-auto">
                  ← {isUk ? "Назад" : "Back"}
                </button>
              </div>
            )}
          </div>

          {/* Result */}
          {calcStep === 3 && calcIssue && calcResult && (
            <div className="mt-6 bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-sm text-gray-500 dark:text-neutral-400 mb-1">{isUk ? "Орієнтовна вартість" : "Estimated price"}</p>
                  <p className="text-3xl font-extrabold text-[#F97316]">
                    {calcResult.priceMin === calcResult.priceMax
                      ? `₴${calcResult.priceMin.toLocaleString()}`
                      : `₴${calcResult.priceMin.toLocaleString()} – ₴${calcResult.priceMax.toLocaleString()}`}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">⏱ {isUk ? calcResult.timeUk : calcResult.timeEn}</p>
                  <p className="text-sm text-emerald-600 font-medium mt-1">✅ {isUk ? "Гарантія 90 днів включена" : "90-day warranty included"}</p>
                </div>
                <button
                  onClick={() => { setBookingStep(1); setBookingData({ location: null, master: null, date: "", time: "", name: "", phone: "", device: "", confirmed: false }); }}
                  className="bg-[#F97316] hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors shrink-0"
                >
                  {isUk ? "Записатись на ремонт" : "Book Repair"}
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-orange-200 flex gap-4 flex-wrap text-sm text-gray-600">
                <span><EmojiIcon emoji="📱" className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? deviceTypes.find((d) => d.key === calcDevice)?.uk : deviceTypes.find((d) => d.key === calcDevice)?.en}</span>
                <span><EmojiIcon emoji="🏷" className="w-4 h-4 inline-block align-middle mr-1" />{calcBrand === "Other" ? (isUk ? "Інший" : "Other") : calcBrand}</span>
                <span><EmojiIcon emoji="🔧" className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? issues.find((i) => i.key === calcIssue)?.uk : issues.find((i) => i.key === calcIssue)?.en}</span>
              </div>
            </div>
          )}

          {/* Reset */}
          {(calcStep > 1 || calcDevice) && (
            <div className="text-center mt-4">
              <button
                onClick={() => { setCalcStep(1); setCalcDevice(""); setCalcBrand(""); setCalcIssue(""); }}
                className="text-xs text-gray-400 dark:text-neutral-500 hover:text-[#F97316] transition-colors"
              >
                {isUk ? "Скинути калькулятор" : "Reset calculator"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. SERVICE CATALOG
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{isUk ? "Каталог послуг" : "Service Catalog"}</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center text-sm mb-8">{isUk ? "Фіксовані ціни. Без прихованих доплат." : "Fixed prices. No hidden fees."}</p>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[
              { key: "smartphones",  en: "Smartphones",  uk: "Смартфони",     emoji: "📱" },
              { key: "laptops",      en: "Laptops",       uk: "Ноутбуки",      emoji: "💻" },
              { key: "tablets",      en: "Tablets",       uk: "Планшети",      emoji: "🖥️" },
              { key: "smartwatches", en: "Smartwatches",  uk: "Смарт-годинники", emoji: "⌚" },
            ].map((cat) => (
              <button
                key={cat.key}
                onClick={() => { setActiveCategory(cat.key); setActiveBrand("All"); }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                  activeCategory === cat.key ? "bg-[#F97316] border-[#F97316] text-white" : "bg-white border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-300 hover:border-orange-200"
                }`}
              >
                <EmojiIcon emoji={cat.emoji} className="w-4 h-4 inline-block align-middle mr-1" />{isUk ? cat.uk : cat.en}
              </button>
            ))}
          </div>

          {/* Brand filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {catalogBrands.map((b) => (
              <button
                key={b}
                onClick={() => setActiveBrand(b)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  activeBrand === b ? "bg-[#1F2937] text-white border-[#1F2937]" : "bg-white text-gray-500 dark:text-neutral-400 border-gray-200 dark:border-neutral-700 hover:border-gray-400"
                }`}
              >
                {b === "All" ? (isUk ? "Всі" : "All") : b}
              </button>
            ))}
          </div>

          {/* Top repairs badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-[#F97316] uppercase tracking-wide">🔥 {isUk ? "Топ ремонти цього тижня" : "Top repairs this week"}</span>
          </div>

          {/* Repair cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRepairs.map((r, idx) => (
              <div key={idx} className={`bg-white rounded-xl p-5 border-2 transition-all hover:shadow-md ${r.top ? "border-orange-200" : "border-gray-100"}`}>
                {r.top && (
                  <span className="inline-block bg-orange-50 text-[#F97316] text-xs font-bold px-2 py-0.5 rounded-full mb-2">
                    🔥 {isUk ? "Топ" : "Top"}
                  </span>
                )}
                <p className="font-semibold text-sm mb-3">{isUk ? r.nameUk : r.nameEn}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#F97316] font-bold text-lg">{r.price}</span>
                  <div className="text-right">
                    <p className="text-gray-400 dark:text-neutral-500 text-xs">⏱ {isUk ? r.timeUk : r.timeEn}</p>
                    <p className="text-emerald-600 text-xs">✅ {isUk ? r.warrantyUk : r.warrantyEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredRepairs.length === 0 && (
            <p className="text-center text-gray-400 dark:text-neutral-500 py-8">{isUk ? "Не знайдено. Оберіть інший бренд." : "No results. Try a different brand."}</p>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. ORDER TRACKING
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{isUk ? "Відстеження замовлення" : "Order Tracking"}</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center text-sm mb-8">
            {isUk ? "Введіть номер замовлення, щоб дізнатись статус ремонту" : "Enter your order number to check repair status"}
          </p>

          {/* Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => { setTrackingNumber(e.target.value); setTrackingResult(null); }}
              placeholder={isUk ? "Наприклад: RP-1042" : "e.g. RP-1042"}
              className="flex-1 border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            />
            <button
              onClick={handleTrack}
              className="bg-[#F97316] hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors shrink-0"
            >
              {isUk ? "Знайти" : "Track"}
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-neutral-500 text-center mb-8">
            {isUk ? "Спробуйте: RP-1042 · RP-0987 · RP-2201 · RP-3310" : "Try: RP-1042 · RP-0987 · RP-2201 · RP-3310"}
          </p>

          {/* Result */}
          {trackingResult && (
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-700 p-6">
              {!trackingResult.found ? (
                <p className="text-center text-gray-500">{isUk ? "Замовлення не знайдено. Перевірте номер." : "Order not found. Please check the number."}</p>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
                    <div>
                      <p className="font-bold text-[#1F2937]">{trackingNumber.toUpperCase()}</p>
                      <p className="text-sm text-gray-600">{isUk ? trackingResult.deviceUk : trackingResult.deviceEn}</p>
                      <p className="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{isUk ? "Майстер:" : "Master:"} {isUk ? trackingResult.masterUk : trackingResult.masterEn}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{isUk ? "Очікуване завершення" : "Estimated completion"}</p>
                      <p className="font-semibold text-[#F97316]">{isUk ? trackingResult.estimatedUk : trackingResult.estimatedEn}</p>
                    </div>
                  </div>

                  {/* Progress bar — 6 stages */}
                  <div className="relative">
                    {/* Line */}
                    <div className="absolute top-4 left-4 right-4 h-1 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-[#F97316] rounded-full transition-all"
                        style={{ width: `${Math.max(0, (trackingResult.currentStage) / (trackingStages.length - 1)) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between relative z-10">
                      {trackingStages.map((stage, idx) => {
                        const done    = idx < trackingResult.currentStage;
                        const current = idx === trackingResult.currentStage;
                        return (
                          <div key={idx} className="flex flex-col items-center gap-1 w-12">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                              done    ? "bg-[#F97316] border-[#F97316] text-white" :
                              current ? "bg-white border-[#F97316] text-[#F97316] ring-4 ring-orange-100" :
                                        "bg-white border-gray-200 dark:border-neutral-700 text-gray-300"
                            }`}>
                              {done ? "✓" : idx + 1}
                            </div>
                            <span className={`text-center leading-tight text-[9px] ${current ? "font-bold text-[#F97316]" : done ? "text-gray-600" : "text-gray-300"}`}>
                              {isUk ? stage.uk : stage.en}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. ONLINE BOOKING
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2">{isUk ? "Онлайн-запис" : "Online Booking"}</h2>
          <p className="text-gray-500 dark:text-neutral-400 text-center text-sm mb-8">{isUk ? "Запишіться за 4 прості кроки" : "Book your repair in 4 simple steps"}</p>

          {/* Booking progress */}
          {!bookingData.confirmed && (
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center gap-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    bookingStep > s ? "bg-[#F97316] text-white" : bookingStep === s ? "bg-[#F97316] text-white ring-4 ring-orange-100" : "bg-gray-200 text-gray-400"
                  }`}>{bookingStep > s ? "✓" : s}</div>
                  {s < 4 && <div className={`w-8 h-0.5 rounded-full ${bookingStep > s ? "bg-[#F97316]" : "bg-gray-200"}`} />}
                </div>
              ))}
            </div>
          )}

          <div className="bg-white rounded-2xl border border-gray-100 dark:border-neutral-700 p-6 shadow-sm">

            {/* Confirmed */}
            {bookingData.confirmed ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✅</div>
                <h3 className="text-xl font-bold text-[#1F2937] mb-2">{isUk ? "Запис підтверджено!" : "Booking Confirmed!"}</h3>
                <p className="text-gray-500 dark:text-neutral-400 text-sm mb-4">
                  {isUk
                    ? `Ми зв'яжемося з вами за номером ${bookingData.phone} для підтвердження.`
                    : `We'll contact you at ${bookingData.phone} to confirm.`}
                </p>
                <div className="bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 text-left text-sm space-y-1.5 mb-6">
                  <p><span className="text-gray-400">{isUk ? "Адреса:" : "Location:"}</span> <span className="font-medium">{isUk ? bookingLocationObj?.nameUk : bookingLocationObj?.nameEn}</span></p>
                  <p><span className="text-gray-400">{isUk ? "Майстер:" : "Master:"}</span> <span className="font-medium">{isUk ? bookingMasterObj?.nameUk : bookingMasterObj?.nameEn}</span></p>
                  <p><span className="text-gray-400">{isUk ? "Дата та час:" : "Date & time:"}</span> <span className="font-medium">{bookingData.date} {bookingData.time}</span></p>
                  <p><span className="text-gray-400">{isUk ? "Пристрій:" : "Device:"}</span> <span className="font-medium">{bookingData.device}</span></p>
                </div>
                <button
                  onClick={() => { setBookingStep(1); setBookingData({ location: null, master: null, date: "", time: "", name: "", phone: "", device: "", confirmed: false }); }}
                  className="text-sm text-[#F97316] hover:underline"
                >
                  {isUk ? "Новий запис" : "New booking"}
                </button>
              </div>
            ) : (
              <>
                {/* Step 1: Location */}
                {bookingStep === 1 && (
                  <div>
                    <p className="font-semibold mb-4">{isUk ? "Оберіть зручну адресу" : "Select a convenient location"}</p>
                    <div className="space-y-3">
                      {locations.map((loc) => (
                        <button
                          key={loc.id}
                          onClick={() => setBookingData((p) => ({ ...p, location: loc.id }))}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            bookingData.location === loc.id ? "border-[#F97316] bg-orange-50" : "border-gray-200 dark:border-neutral-700 hover:border-orange-200"
                          }`}
                        >
                          <p className="font-medium text-sm">📍 {isUk ? loc.nameUk : loc.nameEn}</p>
                          <p className="text-xs text-gray-400 dark:text-neutral-500 mt-0.5">{isUk ? loc.hoursUk : loc.hoursEn}</p>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-end">
                      <button
                        disabled={!bookingData.location}
                        onClick={() => setBookingStep(2)}
                        className="bg-[#F97316] disabled:opacity-40 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        {isUk ? "Далі" : "Next"} →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Master */}
                {bookingStep === 2 && (
                  <div>
                    <p className="font-semibold mb-4">{isUk ? "Оберіть майстра" : "Select a master"}</p>
                    <div className="space-y-3">
                      {masters.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setBookingData((p) => ({ ...p, master: m.id }))}
                          className={`w-full text-left p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                            bookingData.master === m.id ? "border-[#F97316] bg-orange-50" : "border-gray-200 dark:border-neutral-700 hover:border-orange-200"
                          }`}
                        >
                          <div className={`${m.color} shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm`}>{m.initials}</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-sm">{isUk ? m.nameUk : m.nameEn}</p>
                            <p className="text-xs text-gray-500">{isUk ? m.specUk : m.specEn}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[#F97316] font-bold text-sm">⭐ {m.rating}</p>
                            <p className="text-xs text-gray-400">{m.reviews} {isUk ? "відгуків" : "reviews"}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button onClick={() => setBookingStep(1)} className="text-sm text-gray-400 dark:text-neutral-500 hover:text-gray-600">← {isUk ? "Назад" : "Back"}</button>
                      <button
                        disabled={!bookingData.master}
                        onClick={() => setBookingStep(3)}
                        className="bg-[#F97316] disabled:opacity-40 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        {isUk ? "Далі" : "Next"} →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Date & time */}
                {bookingStep === 3 && (
                  <div>
                    <p className="font-semibold mb-4">{isUk ? "Оберіть дату та час" : "Select date & time"}</p>
                    <input
                      type="date"
                      value={bookingData.date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingData((p) => ({ ...p, date: e.target.value, time: "" }))}
                      className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                    />
                    {bookingData.date && (
                      <>
                        <p className="text-sm text-gray-500 dark:text-neutral-400 mb-3">{isUk ? "Доступний час:" : "Available slots:"}</p>
                        <div className="grid grid-cols-5 gap-2">
                          {timeSlots.map((t) => (
                            <button
                              key={t}
                              onClick={() => setBookingData((p) => ({ ...p, time: t }))}
                              className={`py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                                bookingData.time === t ? "border-[#F97316] bg-orange-50 text-[#F97316]" : "border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 hover:border-orange-200"
                              }`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    <div className="mt-6 flex justify-between">
                      <button onClick={() => setBookingStep(2)} className="text-sm text-gray-400 dark:text-neutral-500 hover:text-gray-600">← {isUk ? "Назад" : "Back"}</button>
                      <button
                        disabled={!bookingData.date || !bookingData.time}
                        onClick={() => setBookingStep(4)}
                        className="bg-[#F97316] disabled:opacity-40 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        {isUk ? "Далі" : "Next"} →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact info */}
                {bookingStep === 4 && (
                  <div>
                    <p className="font-semibold mb-4">{isUk ? "Ваші дані та опис пристрою" : "Your details & device description"}</p>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder={isUk ? "Ваше ім'я" : "Your name"}
                        value={bookingData.name}
                        onChange={(e) => setBookingData((p) => ({ ...p, name: e.target.value }))}
                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                      />
                      <input
                        type="tel"
                        placeholder={isUk ? "Номер телефону" : "Phone number"}
                        value={bookingData.phone}
                        onChange={(e) => setBookingData((p) => ({ ...p, phone: e.target.value }))}
                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                      />
                      <textarea
                        placeholder={isUk ? "Опишіть пристрій та проблему (наприклад: iPhone 14 Pro, розбитий екран)" : "Describe your device and issue (e.g. iPhone 14 Pro, cracked screen)"}
                        value={bookingData.device}
                        onChange={(e) => setBookingData((p) => ({ ...p, device: e.target.value }))}
                        rows={3}
                        className="w-full border border-gray-200 dark:border-neutral-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316] resize-none"
                      />
                    </div>
                    {/* Summary */}
                    <div className="mt-4 bg-gray-50 dark:bg-neutral-900 rounded-xl p-4 text-xs text-gray-500 dark:text-neutral-400 space-y-1">
                      <p>📍 {isUk ? bookingLocationObj?.nameUk : bookingLocationObj?.nameEn}</p>
                      <p>👤 {isUk ? bookingMasterObj?.nameUk : bookingMasterObj?.nameEn}</p>
                      <p>📅 {bookingData.date} {bookingData.time}</p>
                    </div>
                    <div className="mt-6 flex justify-between">
                      <button onClick={() => setBookingStep(3)} className="text-sm text-gray-400 dark:text-neutral-500 hover:text-gray-600">← {isUk ? "Назад" : "Back"}</button>
                      <button
                        disabled={!bookingData.name || !bookingData.phone || !bookingData.device}
                        onClick={() => setBookingData((p) => ({ ...p, confirmed: true }))}
                        className="bg-[#F97316] disabled:opacity-40 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors"
                      >
                        {isUk ? "Підтвердити запис" : "Confirm Booking"}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          6. TRUST SIGNALS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">{isUk ? "Чому обирають RepairPro" : "Why Choose RepairPro"}</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { value: "8,240+", en: "Repairs completed", uk: "Ремонтів виконано" },
              { value: "4.9★",   en: "Average rating",    uk: "Середній рейтинг" },
              { value: "90",     en: "Days warranty",      uk: "Днів гарантії" },
              { value: "3",      en: "Locations in Dnipro", uk: "Точки в Дніпрі" },
            ].map((s) => (
              <div key={s.value} className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-5 text-center border border-gray-100">
                <p className="text-3xl font-extrabold text-[#F97316] mb-1">{s.value}</p>
                <p className="text-sm text-gray-500">{isUk ? s.uk : s.en}</p>
              </div>
            ))}
          </div>

          {/* Before / after */}
          <div className="mb-12">
            <h3 className="text-lg font-bold text-center mb-6">{isUk ? "До та після ремонту" : "Before & After Repair"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "iPhone 14 Pro", issueEn: "Cracked screen",  issueUk: "Розбитий екран" },
                { label: "MacBook Air M2", issueEn: "Spilled liquid",  issueUk: "Рідина потрапила" },
                { label: "Samsung S23",   issueEn: "Won't charge",    issueUk: "Не заряджається" },
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 dark:bg-neutral-900 rounded-2xl overflow-hidden border border-gray-100">
                  <div className="flex">
                    <div className="flex-1 p-4 bg-red-50 flex flex-col items-center justify-center gap-1 min-h-28">
                      <span className="text-red-400 font-bold text-xs uppercase tracking-wide">{isUk ? "До" : "Before"}</span>
                      <EmojiIcon emoji="💔" className="w-7 h-7" />
                      <span className="text-xs text-red-400 text-center">{isUk ? item.issueUk : item.issueEn}</span>
                    </div>
                    <div className="w-px bg-gray-200" />
                    <div className="flex-1 p-4 bg-emerald-50 flex flex-col items-center justify-center gap-1 min-h-28">
                      <span className="text-emerald-500 font-bold text-xs uppercase tracking-wide">{isUk ? "Після" : "After"}</span>
                      <EmojiIcon emoji="✅" className="w-7 h-7" />
                      <span className="text-xs text-emerald-600 text-center">{isUk ? "Відремонтовано" : "Repaired"}</span>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 dark:border-neutral-700 text-center text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-linear-to-br from-gray-50 to-orange-50 rounded-2xl p-6 mb-12 border border-orange-100">
            <h3 className="text-base font-bold text-center mb-4">{isUk ? "Сертифікати та партнерства" : "Certifications & Partnerships"}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: "🍎", en: "Apple Authorized Service",  uk: "Авторизований сервіс Apple" },
                { icon: "🏅", en: "Samsung Premium Partner",   uk: "Преміум-партнер Samsung" },
                { icon: "🛡️", en: "ISO 9001 Quality",          uk: "ISO 9001 Якість" },
                { icon: "⚡", en: "Express Repair Certified",  uk: "Сертифікат Expres Repair" },
              ].map((c) => (
                <div key={c.en} className="flex items-center gap-2 bg-white dark:bg-neutral-800 rounded-xl px-4 py-2 text-sm font-medium border border-gray-100 dark:border-neutral-700 shadow-sm">
                  <span>{c.icon}</span>
                  <span>{isUk ? c.uk : c.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <h3 className="text-lg font-bold text-center mb-6">{isUk ? "Відгуки клієнтів" : "Customer Reviews"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-neutral-900 rounded-2xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {(isUk ? r.nameUk : r.nameEn).charAt(0)}
                    </div>
                    <span className="font-semibold text-sm">{isUk ? r.nameUk : r.nameEn}</span>
                  </div>
                  <span className="text-[#F97316] font-bold text-sm">{"★".repeat(r.rating)}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-neutral-300 leading-relaxed">{isUk ? r.textUk : r.textEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. FOOTER
      ══════════════════════════════════════════════════════════════════════ */}
      <footer className="bg-[#1F2937] text-gray-300 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {locations.map((loc) => (
              <div key={loc.id}>
                <p className="text-white font-bold mb-1 flex items-center gap-1">
                  📍 {isUk ? loc.nameUk.split("—")[0].trim() : loc.nameEn.split("—")[0].trim()}
                </p>
                <p className="text-sm text-gray-400">{isUk ? loc.nameUk.split("—")[1]?.trim() : loc.nameEn.split("—")[1]?.trim()}</p>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">{isUk ? loc.hoursUk : loc.hoursEn}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <EmojiIcon emoji="🔧" className="w-5 h-5" />
              <span className="font-bold text-white">RepairPro</span>
              <span className="text-gray-500 dark:text-neutral-400 text-sm">— {isUk ? "Сервісний центр №1 в Дніпрі" : "Service Center #1 in Dnipro"}</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span className="hover:text-[#F97316] cursor-pointer transition-colors">{isUk ? "Конфіденційність" : "Privacy"}</span>
              <span className="hover:text-[#F97316] cursor-pointer transition-colors">{isUk ? "Умови" : "Terms"}</span>
              <span className="hover:text-[#F97316] cursor-pointer transition-colors">{isUk ? "Контакти" : "Contact"}</span>
            </div>
          </div>
          <p className="text-center text-gray-600 dark:text-neutral-300 text-xs mt-4">© 2026 RepairPro. {isUk ? "Всі права захищені." : "All rights reserved."}</p>
        </div>
      </footer>

    </div>
  );
}
