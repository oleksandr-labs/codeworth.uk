"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Home, Folder, File } from "lucide-react";

interface Props {
  variant?: string;
  isUk: boolean;
}

interface Node {
  id: string;
  labelEn: string;
  labelUk: string;
  icon?: "home" | "folder" | "file";
  children?: Node[];
}

const TREE: Node = {
  id: "root",
  labelEn: "Codeworth",
  labelUk: "Codeworth",
  icon: "home",
  children: [
    {
      id: "services",
      labelEn: "Services",
      labelUk: "Послуги",
      icon: "folder",
      children: [
        { id: "web-dev", labelEn: "Website Development", labelUk: "Розробка сайту", icon: "file" },
        { id: "landing", labelEn: "Landing Pages", labelUk: "Лендінги", icon: "file" },
        { id: "ai", labelEn: "AI Solutions", labelUk: "AI-рішення", icon: "file" },
        { id: "ml", labelEn: "Machine Learning", labelUk: "Machine Learning", icon: "file" },
      ],
    },
    {
      id: "portfolio",
      labelEn: "Portfolio",
      labelUk: "Портфоліо",
      icon: "folder",
      children: [
        { id: "case-1", labelEn: "Restaurant «Smachno»", labelUk: "Ресторан «Смачно»", icon: "file" },
        { id: "case-2", labelEn: "Beauty Salon Lumiere", labelUk: "Салон краси Lumiere", icon: "file" },
        { id: "case-3", labelEn: "FitZone Gym", labelUk: "FitZone Gym", icon: "file" },
      ],
    },
    {
      id: "marketplace",
      labelEn: "Marketplace",
      labelUk: "Маркетплейс",
      icon: "folder",
      children: [
        { id: "catalog", labelEn: "Catalog", labelUk: "Каталог", icon: "file" },
        { id: "cart", labelEn: "Cart & Checkout", labelUk: "Кошик і Checkout", icon: "file" },
        { id: "account", labelEn: "Account", labelUk: "Кабінет", icon: "file" },
      ],
    },
    {
      id: "blog",
      labelEn: "Blog",
      labelUk: "Блог",
      icon: "folder",
      children: [
        { id: "categories", labelEn: "Categories", labelUk: "Категорії", icon: "file" },
        { id: "tags", labelEn: "Tags", labelUk: "Теги", icon: "file" },
        { id: "authors", labelEn: "Authors", labelUk: "Автори", icon: "file" },
      ],
    },
    { id: "contact", labelEn: "Contact", labelUk: "Контакти", icon: "file" },
    { id: "pricing", labelEn: "Pricing", labelUk: "Ціни", icon: "file" },
  ],
};

function NodeView({ node, depth, isUk, expanded, onToggle }: { node: Node; depth: number; isUk: boolean; expanded: Set<string>; onToggle: (id: string) => void }) {
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = expanded.has(node.id);
  const Icon = node.icon === "home" ? Home : node.icon === "folder" ? Folder : File;
  const iconColor = node.icon === "home" ? "text-indigo-500" : node.icon === "folder" ? "text-amber-500" : "text-neutral-400";

  return (
    <div role="treeitem" aria-expanded={hasChildren ? isOpen : undefined}>
      <button
        onClick={() => hasChildren && onToggle(node.id)}
        className="flex items-center gap-1.5 w-full text-left py-1.5 px-2 rounded-md hover:bg-indigo-50 transition-colors text-sm"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        disabled={!hasChildren}
      >
        {hasChildren ? (
          isOpen ? <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
        ) : (
          <span className="w-3.5 shrink-0" />
        )}
        <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
        <span className="text-neutral-700">{isUk ? node.labelUk : node.labelEn}</span>
        {hasChildren && (
          <span className="ml-auto text-xs text-neutral-400 tabular-nums">
            {node.children!.length}
          </span>
        )}
      </button>
      {hasChildren && isOpen && (
        <div role="group">
          {node.children!.map((c) => (
            <NodeView key={c.id} node={c} depth={depth + 1} isUk={isUk} expanded={expanded} onToggle={onToggle} />
          ))}
        </div>
      )}
    </div>
  );
}

export function VisualSitemapDemo({ isUk }: Props) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["root", "services"]));

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const expandAll = () => {
    const all = new Set<string>();
    const walk = (n: Node) => {
      all.add(n.id);
      n.children?.forEach(walk);
    };
    walk(TREE);
    setExpanded(all);
  };

  const collapseAll = () => setExpanded(new Set(["root"]));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <button
          onClick={expandAll}
          className="px-3 py-1.5 rounded-md bg-indigo-100 text-indigo-700 text-sm font-medium hover:bg-indigo-200 transition-colors"
        >
          {isUk ? "Розгорнути все" : "Expand all"}
        </button>
        <button
          onClick={collapseAll}
          className="px-3 py-1.5 rounded-md bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          {isUk ? "Згорнути все" : "Collapse all"}
        </button>
      </div>

      <div
        role="tree"
        aria-label={isUk ? "Структура сайту" : "Site structure"}
        className="rounded-2xl border border-neutral-200 bg-white p-3"
      >
        <NodeView node={TREE} depth={0} isUk={isUk} expanded={expanded} onToggle={toggle} />
      </div>

      <p className="text-sm text-neutral-500">
        {isUk
          ? "Інтерактивне дерево навігації для великих сайтів. ARIA tree role + клавіатурна навігація."
          : "Interactive navigation tree for large sites. ARIA tree role + keyboard navigation."}
      </p>
    </div>
  );
}
