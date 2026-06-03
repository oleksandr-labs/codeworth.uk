import type { FC } from "react";
import type { LucideProps } from "lucide-react";
import {
  ArrowUp, BarChart3, Beef, Bike, BookOpen, Bot, Brain, Briefcase,
  Building2, Cake, Calendar, Calculator, Camera, Car, ClipboardList,
  CheckCircle2, Coffee, Cookie, CreditCard, DollarSign, Droplets, Dumbbell, Eye,
  FilePen, FileText, Flame, Flower2, Gamepad2, GraduationCap, Globe,
  Handshake, HardHat, Heart, HelpCircle, Home, Hotel, Leaf, Link,
  Lock, Mail, MapPin, Megaphone, MessageCircle, Monitor, Moon, Mountain,
  Music, Package, Palette, PartyPopper, PawPrint, PenLine, Pill, Plane,
  Receipt, Rocket, Ruler, Scale, Scissors, Search, Settings, Shield,
  Shirt, ShoppingCart, SlidersHorizontal, Smile, Sofa, Sparkles, Star,
  Stethoscope, Ticket, TrendingUp, Trophy, Truck, UtensilsCrossed,
  Users, Warehouse, Wheat, Wine, Wrench, Zap,
} from "lucide-react";

const EMOJI_MAP: Record<string, FC<LucideProps>> = {
  // Food & drink
  "🍽": UtensilsCrossed, "🍽️": UtensilsCrossed,
  "🍔": Beef, "🍷": Wine, "☕": Coffee,
  // Health & beauty
  "✂️": Scissors, "✂": Scissors,
  "🏥": Stethoscope, "🦷": Smile,
  "💊": Pill, "💪": Dumbbell, "🏋": Dumbbell, "🏋️": Dumbbell,
  "🌸": Flower2, "💇": Scissors, "💆": Sparkles, "🧘": Sparkles,
  // Business & finance
  "💼": Briefcase, "👔": Briefcase, "💰": DollarSign,
  "🧾": Receipt, "🏦": Building2, "⚖️": Scale, "⚖": Scale,
  "📊": BarChart3, "📈": TrendingUp,
  // Education
  "📚": BookOpen, "🎓": GraduationCap,
  // Technology
  "🤖": Bot, "💻": Monitor, "⚙️": Settings, "⚙": Settings,
  "🌐": Globe, "⚡": Zap, "🚀": Rocket,
  "🔒": Lock, "🔐": Lock, "🛡": Shield, "🛡️": Shield,
  "🔗": Link, "🔍": Search, "🔎": Search,
  "📣": Megaphone, "📅": Calendar, "🗓️": Calendar, "🧮": Calculator,
  "🍪": Cookie, "💬": MessageCircle, "🎛": SlidersHorizontal,
  "🌙": Moon, "⬆️": ArrowUp, "⬆": ArrowUp,
  // Real estate & construction
  "🏠": Home, "🏡": Home, "🏗": HardHat, "🏗️": HardHat,
  "🏭": Warehouse, "🛋": Sofa,
  // Nature & agriculture
  "🌾": Wheat, "🥬": Leaf, "🌿": Leaf, "🍯": Droplets,
  // Travel & events
  "✈️": Plane, "✈": Plane, "🚁": Plane, "🏔": Mountain,
  "🏨": Hotel, "🎉": PartyPopper, "🎫": Ticket,
  // Transport
  "🚛": Truck, "🚚": Truck, "🛵": Bike, "🚗": Car,
  // Shopping
  "🛒": ShoppingCart, "🛍️": ShoppingCart, "🛍": ShoppingCart, "👗": Shirt,
  // Media & arts
  "📸": Camera, "📷": Camera, "🎵": Music, "🎨": Palette, "🧶": Palette,
  // Other
  "🐾": PawPrint, "🧠": Brain, "🧹": Sparkles, "📐": Ruler,
  "🗣": MessageCircle, "💛": Heart, "🧸": Heart, "👶": Heart,
  "🏛": Building2, "🏢": Building2, "👥": Users, "🤝": Handshake,
  "🎮": Gamepad2, "🎠": Star, "🏆": Trophy, "📦": Package, "✍️": PenLine, "✍": PenLine,
  "👁": Eye, "👁️": Eye, "💳": CreditCard, "🔥": Flame,
  "✅": CheckCircle2, "☑️": CheckCircle2, "⭐": Star, "⭐️": Star, "✨": Sparkles,
  "📬": Mail, "📝": FilePen, "📋": ClipboardList, "📍": MapPin,
  "❓": HelpCircle, "📄": FileText, "🔧": Wrench, "🎂": Cake,
};

interface EmojiIconProps {
  emoji: string;
  className?: string;
}

export function EmojiIcon({ emoji, className = "w-6 h-6" }: EmojiIconProps) {
  const Icon = EMOJI_MAP[emoji];
  if (!Icon) return <span aria-hidden="true">{emoji}</span>;
  return <Icon className={className} aria-hidden="true" />;
}
