import { NICHES_DATA, getNiche, NICHE_CATEGORIES } from "../data/niches";

describe("NICHES_DATA", () => {
  it("contains 34 niches", () => {
    expect(NICHES_DATA).toHaveLength(34);
  });

  it("every niche has required fields", () => {
    NICHES_DATA.forEach((n) => {
      expect(n.slug).toBeTruthy();
      expect(n.title).toBeTruthy();
      expect(n.description).toBeTruthy();
      expect(n.category).toBeTruthy();
      expect(n.priceFrom).toBeGreaterThan(0);
      expect(n.deliveryDays).toBeGreaterThan(0);
      expect(["simple", "medium", "complex"]).toContain(n.complexity);
      expect(Array.isArray(n.features)).toBe(true);
      expect(n.features.length).toBeGreaterThanOrEqual(5);
      expect(Array.isArray(n.pages)).toBe(true);
      expect(n.pages.length).toBeGreaterThanOrEqual(3);
      expect(Array.isArray(n.tech)).toBe(true);
      expect(n.tech.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(n.tags)).toBe(true);
    });
  });

  it("all slugs are unique", () => {
    const slugs = NICHES_DATA.map((n) => n.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all slugs are URL-safe", () => {
    NICHES_DATA.forEach((n) => {
      expect(n.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("all categories are in NICHE_CATEGORIES", () => {
    NICHES_DATA.forEach((n) => {
      expect(NICHE_CATEGORIES).toContain(n.category);
    });
  });

  it("prices are reasonable (> 1000 UAH, < 100000 UAH)", () => {
    NICHES_DATA.forEach((n) => {
      expect(n.priceFrom).toBeGreaterThan(1000);
      expect(n.priceFrom).toBeLessThan(100000);
    });
  });

  it("deliveryDays are reasonable (5-60 days)", () => {
    NICHES_DATA.forEach((n) => {
      expect(n.deliveryDays).toBeGreaterThanOrEqual(5);
      expect(n.deliveryDays).toBeLessThanOrEqual(60);
    });
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    NICHES_DATA.forEach((n) => {
      expect(n.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });
});

describe("NICHES_DATA — extended data fields", () => {
  it("every niche has exactly 5 processSteps", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.processSteps)).toBe(true);
      expect(n.processSteps?.length).toBe(5);
      n.processSteps?.forEach((s) => {
        expect(s.title).toBeTruthy();
        expect(s.description).toBeTruthy();
        expect(s.icon).toBeTruthy();
      });
    });
  });

  it("every niche has at least 2 pricingPlans", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.pricingPlans)).toBe(true);
      expect((n.pricingPlans?.length ?? 0)).toBeGreaterThanOrEqual(2);
      n.pricingPlans?.forEach((p) => {
        expect(p.name).toBeTruthy();
        expect(p.price).toBeTruthy();
        expect(Array.isArray(p.features)).toBe(true);
        expect(p.features.length).toBeGreaterThanOrEqual(3);
        p.features.forEach((f) => {
          expect(f.text).toBeTruthy();
          expect(typeof f.included).toBe("boolean");
        });
      });
    });
  });

  it("exactly one pricingPlan is highlighted per niche (if any exist)", () => {
    NICHES_DATA.forEach((n) => {
      if (!n.pricingPlans?.length) return;
      const highlighted = n.pricingPlans.filter((p) => p.highlighted);
      expect(highlighted.length).toBeLessThanOrEqual(1);
    });
  });

  it("every niche has at least 3 calculatorSteps", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.calculatorSteps)).toBe(true);
      expect((n.calculatorSteps?.length ?? 0)).toBeGreaterThanOrEqual(3);
      n.calculatorSteps?.forEach((s) => {
        expect(s.label).toBeTruthy();
        expect(Array.isArray(s.options)).toBe(true);
        expect(s.options.length).toBeGreaterThanOrEqual(2);
        s.options.forEach((o) => {
          expect(o.label).toBeTruthy();
          expect(typeof o.price).toBe("number");
        });
      });
    });
  });

  it("every niche has at least 2 team members", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.team)).toBe(true);
      expect((n.team?.length ?? 0)).toBeGreaterThanOrEqual(2);
      n.team?.forEach((m) => {
        expect(m.name).toBeTruthy();
        expect(m.role).toBeTruthy();
        expect(m.emoji).toBeTruthy();
      });
    });
  });

  it("every niche has at least 2 trustStats", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.trustStats)).toBe(true);
      expect((n.trustStats?.length ?? 0)).toBeGreaterThanOrEqual(2);
      n.trustStats?.forEach((s) => {
        expect(s.value).toBeTruthy();
        expect(s.label).toBeTruthy();
      });
    });
  });

  it("every niche has at least 3 nicheFaq items", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.nicheFaq)).toBe(true);
      expect((n.nicheFaq?.length ?? 0)).toBeGreaterThanOrEqual(3);
      n.nicheFaq?.forEach((item) => {
        expect(item.q).toBeTruthy();
        expect(item.a).toBeTruthy();
      });
    });
  });

  it("every niche has at least 1 promotion", () => {
    NICHES_DATA.forEach((n) => {
      expect(Array.isArray(n.promotions)).toBe(true);
      expect((n.promotions?.length ?? 0)).toBeGreaterThanOrEqual(1);
      n.promotions?.forEach((p) => {
        expect(p.title).toBeTruthy();
        expect(p.description).toBeTruthy();
      });
    });
  });
});

describe("getNiche()", () => {
  it("returns niche by valid slug", () => {
    const n = getNiche("restaurant");
    expect(n).toBeDefined();
    expect(n?.slug).toBe("restaurant");
    expect(n?.title).toBe("Ресторан / Кафе");
  });

  it("returns undefined for unknown slug", () => {
    expect(getNiche("nonexistent-niche")).toBeUndefined();
  });

  it("returns correct niche for every slug in NICHES_DATA", () => {
    NICHES_DATA.forEach((n) => {
      const found = getNiche(n.slug);
      expect(found).toBeDefined();
      expect(found?.slug).toBe(n.slug);
    });
  });
});

describe("NichePropertyListing — realestate niche", () => {
  const realestate = getNiche("realestate");

  it("realestate niche exists", () => {
    expect(realestate).toBeDefined();
  });

  it("has propertyListings array with 6 items", () => {
    expect(Array.isArray(realestate?.propertyListings)).toBe(true);
    expect(realestate?.propertyListings?.length).toBe(6);
  });

  it("every property listing has required fields", () => {
    realestate?.propertyListings?.forEach((prop) => {
      expect(prop.id).toBeTruthy();
      expect(prop.title).toBeTruthy();
      expect(prop.type).toBeTruthy();
      expect(prop.price).toBeTruthy();
      expect(prop.area).toBeTruthy();
      expect(prop.district).toBeTruthy();
      expect(prop.gradient).toBeTruthy();
      expect(prop.icon).toBeTruthy();
    });
  });

  it("all property ids are unique", () => {
    const ids = realestate?.propertyListings?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    realestate?.propertyListings?.forEach((prop) => {
      expect(prop.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("rooms count is positive when present", () => {
    realestate?.propertyListings?.forEach((prop) => {
      if (prop.rooms !== undefined) {
        expect(prop.rooms).toBeGreaterThan(0);
      }
    });
  });

  it("at least one property has a badge", () => {
    const withBadge = realestate?.propertyListings?.filter((p) => p.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });

  it("at least one property has tags", () => {
    const withTags = realestate?.propertyListings?.filter(
      (p) => p.tags && p.tags.length > 0
    ) ?? [];
    expect(withTags.length).toBeGreaterThan(0);
  });

  it("propertyListings is undefined for non-real-estate niches", () => {
    const restaurant = getNiche("restaurant");
    expect(restaurant?.propertyListings).toBeUndefined();

    const fitness = getNiche("fitness");
    expect(fitness?.propertyListings).toBeUndefined();
  });
});

describe("NicheMenuItem — restaurant niche", () => {
  const restaurant = getNiche("restaurant");

  it("restaurant niche exists", () => {
    expect(restaurant).toBeDefined();
  });

  it("has menuItems array with 8 items", () => {
    expect(Array.isArray(restaurant?.menuItems)).toBe(true);
    expect(restaurant?.menuItems?.length).toBe(8);
  });

  it("every menu item has required fields", () => {
    restaurant?.menuItems?.forEach((dish) => {
      expect(dish.id).toBeTruthy();
      expect(dish.name).toBeTruthy();
      expect(dish.category).toBeTruthy();
      expect(dish.description).toBeTruthy();
      expect(dish.price).toBeTruthy();
      expect(dish.icon).toBeTruthy();
      expect(dish.gradient).toBeTruthy();
    });
  });

  it("all dish ids are unique", () => {
    const ids = restaurant?.menuItems?.map((d) => d.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    restaurant?.menuItems?.forEach((dish) => {
      expect(dish.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(restaurant?.menuItems?.map((d) => d.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one dish has a badge", () => {
    const withBadge = restaurant?.menuItems?.filter((d) => d.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });

  it("at least one dish has tags", () => {
    const withTags = restaurant?.menuItems?.filter(
      (d) => d.tags && d.tags.length > 0
    ) ?? [];
    expect(withTags.length).toBeGreaterThan(0);
  });

  it("menuItems is undefined for non-restaurant niches", () => {
    const realestate = getNiche("realestate");
    expect(realestate?.menuItems).toBeUndefined();

    const fitness = getNiche("fitness");
    expect(fitness?.menuItems).toBeUndefined();
  });
});

describe("NicheProductCard — fashion niche", () => {
  const fashion = getNiche("fashion");

  it("fashion niche exists", () => {
    expect(fashion).toBeDefined();
  });

  it("has productCards array with 8 items", () => {
    expect(Array.isArray(fashion?.productCards)).toBe(true);
    expect(fashion?.productCards?.length).toBe(8);
  });

  it("every product card has required fields", () => {
    fashion?.productCards?.forEach((product) => {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(product.price).toBeTruthy();
      expect(product.icon).toBeTruthy();
      expect(product.gradient).toBeTruthy();
      expect(Array.isArray(product.sizes)).toBe(true);
      expect(product.sizes.length).toBeGreaterThan(0);
    });
  });

  it("all product ids are unique", () => {
    const ids = fashion?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    fashion?.productCards?.forEach((product) => {
      expect(product.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(fashion?.productCards?.map((p) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one product has a badge", () => {
    const withBadge = fashion?.productCards?.filter((p) => p.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });

  it("at least one product has originalPrice (sale item)", () => {
    const onSale = fashion?.productCards?.filter((p) => p.originalPrice) ?? [];
    expect(onSale.length).toBeGreaterThan(0);
  });

  it("productCards is undefined for non-fashion niches", () => {
    const restaurant = getNiche("restaurant");
    expect(restaurant?.productCards).toBeUndefined();

    const realestate = getNiche("realestate");
    expect(realestate?.productCards).toBeUndefined();
  });
});

describe("NicheTechProduct — electronics niche", () => {
  const electronics = getNiche("electronics");

  it("electronics niche exists", () => {
    expect(electronics).toBeDefined();
  });

  it("has techProducts array with 8 items", () => {
    expect(Array.isArray(electronics?.techProducts)).toBe(true);
    expect(electronics?.techProducts?.length).toBe(8);
  });

  it("every tech product has required fields", () => {
    electronics?.techProducts?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.brand).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
      expect(Array.isArray(item.specs)).toBe(true);
      expect(item.specs.length).toBeGreaterThanOrEqual(2);
    });
  });

  it("all tech product ids are unique", () => {
    const ids = electronics?.techProducts?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    electronics?.techProducts?.forEach((item) => {
      expect(item.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("covers at least 4 distinct categories", () => {
    const categories = new Set(electronics?.techProducts?.map((p) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });

  it("at least one product has a badge", () => {
    const withBadge = electronics?.techProducts?.filter((p) => p.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });

  it("at least one product has originalPrice (sale item)", () => {
    const onSale = electronics?.techProducts?.filter((p) => p.originalPrice) ?? [];
    expect(onSale.length).toBeGreaterThan(0);
  });

  it("techProducts is undefined for non-electronics niches", () => {
    const restaurant = getNiche("restaurant");
    expect(restaurant?.techProducts).toBeUndefined();

    const fashion = getNiche("fashion");
    expect(fashion?.techProducts).toBeUndefined();
  });
});

describe("NicheMenuItem — food-delivery niche", () => {
  const foodDelivery = getNiche("food-delivery");

  it("food-delivery niche exists", () => {
    expect(foodDelivery).toBeDefined();
  });

  it("has menuItems array with 8 items", () => {
    expect(Array.isArray(foodDelivery?.menuItems)).toBe(true);
    expect(foodDelivery?.menuItems?.length).toBe(8);
  });

  it("every menu item has required fields", () => {
    foodDelivery?.menuItems?.forEach((dish) => {
      expect(dish.id).toBeTruthy();
      expect(dish.name).toBeTruthy();
      expect(dish.category).toBeTruthy();
      expect(dish.description).toBeTruthy();
      expect(dish.price).toBeTruthy();
      expect(dish.icon).toBeTruthy();
      expect(dish.gradient).toBeTruthy();
    });
  });

  it("all ids are unique", () => {
    const ids = foodDelivery?.menuItems?.map((d) => d.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least 4 distinct categories", () => {
    const categories = new Set(foodDelivery?.menuItems?.map((d) => d.category));
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });

  it("at least one item has a badge", () => {
    const withBadge = foodDelivery?.menuItems?.filter((d) => d.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });
});

describe("NicheProductCard — furniture niche", () => {
  const furniture = getNiche("furniture");

  it("furniture niche exists and has productCards", () => {
    expect(furniture).toBeDefined();
    expect(Array.isArray(furniture?.productCards)).toBe(true);
    expect(furniture?.productCards?.length).toBe(8);
  });

  it("every furniture card has required fields", () => {
    furniture?.productCards?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
      expect(Array.isArray(item.sizes)).toBe(true);
      expect(item.sizes.length).toBeGreaterThan(0);
    });
  });

  it("all ids are unique", () => {
    const ids = furniture?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has catalogHeading override", () => {
    expect(furniture?.catalogHeading).toBeTruthy();
  });

  it("covers at least 4 distinct categories", () => {
    const categories = new Set(furniture?.productCards?.map((p) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });
});

describe("NicheProductCard — flowers niche", () => {
  const flowers = getNiche("flowers");

  it("flowers niche exists and has productCards", () => {
    expect(flowers).toBeDefined();
    expect(Array.isArray(flowers?.productCards)).toBe(true);
    expect(flowers?.productCards?.length).toBe(8);
  });

  it("every bouquet card has required fields", () => {
    flowers?.productCards?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
      expect(Array.isArray(item.sizes)).toBe(true);
      expect(item.sizes.length).toBeGreaterThan(0);
    });
  });

  it("all ids are unique", () => {
    const ids = flowers?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has catalogHeading override", () => {
    expect(flowers?.catalogHeading).toBeTruthy();
  });

  it("at least one bouquet has a badge", () => {
    const withBadge = flowers?.productCards?.filter((p) => p.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });
});

describe("NicheCourseCard — education niche", () => {
  const education = getNiche("education");

  it("education niche exists and has courseCards", () => {
    expect(education).toBeDefined();
    expect(Array.isArray(education?.courseCards)).toBe(true);
    expect(education?.courseCards?.length).toBe(8);
  });

  it("every course card has required fields", () => {
    education?.courseCards?.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.title).toBeTruthy();
      expect(c.instructor).toBeTruthy();
      expect(c.category).toBeTruthy();
      expect(c.level).toBeTruthy();
      expect(c.price).toBeTruthy();
      expect(c.rating).toBeTruthy();
      expect(c.studentsCount).toBeTruthy();
      expect(c.lessonsCount).toBeGreaterThan(0);
      expect(c.duration).toBeTruthy();
      expect(c.icon).toBeTruthy();
      expect(c.gradient).toBeTruthy();
    });
  });

  it("all course ids are unique", () => {
    const ids = education?.courseCards?.map((c) => c.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    education?.courseCards?.forEach((c) => {
      expect(c.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(education?.courseCards?.map((c) => c.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one course has a badge", () => {
    const withBadge = education?.courseCards?.filter((c) => c.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });

  it("at least one course is free (price '0 ₴')", () => {
    const free = education?.courseCards?.filter((c) => c.price === "0 ₴") ?? [];
    expect(free.length).toBeGreaterThan(0);
  });
});

describe("NicheScheduleItem — fitness niche", () => {
  const fitness = getNiche("fitness");

  it("fitness niche exists and has scheduleItems", () => {
    expect(fitness).toBeDefined();
    expect(Array.isArray(fitness?.scheduleItems)).toBe(true);
    expect((fitness?.scheduleItems?.length ?? 0)).toBeGreaterThanOrEqual(6);
  });

  it("every schedule item has required fields", () => {
    fitness?.scheduleItems?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.title).toBeTruthy();
      expect(item.trainer).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.day).toBeTruthy();
      expect(item.time).toBeTruthy();
      expect(item.duration).toBeTruthy();
      expect(item.spots).toBeGreaterThan(0);
      expect(item.spotsLeft).toBeGreaterThanOrEqual(0);
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
    });
  });

  it("all schedule ids are unique", () => {
    const ids = fitness?.scheduleItems?.map((s) => s.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("spotsLeft never exceeds spots", () => {
    fitness?.scheduleItems?.forEach((item) => {
      expect(item.spotsLeft).toBeLessThanOrEqual(item.spots);
    });
  });

  it("covers at least 4 distinct days", () => {
    const days = new Set(fitness?.scheduleItems?.map((s) => s.day));
    expect(days.size).toBeGreaterThanOrEqual(4);
  });
});

describe("NicheRoomCard — travel niche", () => {
  const travel = getNiche("travel");

  it("travel niche exists and has roomCards", () => {
    expect(travel).toBeDefined();
    expect(Array.isArray(travel?.roomCards)).toBe(true);
    expect((travel?.roomCards?.length ?? 0)).toBeGreaterThanOrEqual(4);
  });

  it("every room card has required fields", () => {
    travel?.roomCards?.forEach((room) => {
      expect(room.id).toBeTruthy();
      expect(room.title).toBeTruthy();
      expect(room.type).toBeTruthy();
      expect(room.pricePerNight).toBeTruthy();
      expect(room.capacity).toBeGreaterThan(0);
      expect(Array.isArray(room.amenities)).toBe(true);
      expect(room.amenities.length).toBeGreaterThan(0);
      expect(room.icon).toBeTruthy();
      expect(room.gradient).toBeTruthy();
    });
  });

  it("all room ids are unique", () => {
    const ids = travel?.roomCards?.map((r) => r.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least 3 distinct room types", () => {
    const types = new Set(travel?.roomCards?.map((r) => r.type));
    expect(types.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one room has a badge", () => {
    const withBadge = travel?.roomCards?.filter((r) => r.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });
});

describe("NicheCarCard — auto niche", () => {
  const auto = getNiche("auto");

  it("auto niche exists and has carCards", () => {
    expect(auto).toBeDefined();
    expect(Array.isArray(auto?.carCards)).toBe(true);
    expect(auto?.carCards?.length).toBe(8);
  });

  it("every car card has required fields", () => {
    auto?.carCards?.forEach((car) => {
      expect(car.id).toBeTruthy();
      expect(car.make).toBeTruthy();
      expect(car.model).toBeTruthy();
      expect(car.year).toBeGreaterThan(2000);
      expect(car.price).toBeTruthy();
      expect(car.fuelType).toBeTruthy();
      expect(car.bodyType).toBeTruthy();
      expect(car.icon).toBeTruthy();
      expect(car.gradient).toBeTruthy();
    });
  });

  it("all car ids are unique", () => {
    const ids = auto?.carCards?.map((c) => c.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least 3 distinct fuel types", () => {
    const fuels = new Set(auto?.carCards?.map((c) => c.fuelType));
    expect(fuels.size).toBeGreaterThanOrEqual(3);
  });

  it("covers at least 3 distinct body types", () => {
    const bodies = new Set(auto?.carCards?.map((c) => c.bodyType));
    expect(bodies.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one car has a badge", () => {
    const withBadge = auto?.carCards?.filter((c) => c.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });
});

describe("NicheMenuItem — bakery niche", () => {
  const bakery = getNiche("bakery");

  it("bakery niche exists and has menuItems", () => {
    expect(bakery).toBeDefined();
    expect(Array.isArray(bakery?.menuItems)).toBe(true);
    expect(bakery?.menuItems?.length).toBe(8);
  });

  it("every bakery item has required fields", () => {
    bakery?.menuItems?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
    });
  });

  it("all bakery ids are unique", () => {
    const ids = bakery?.menuItems?.map((i) => i.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(bakery?.menuItems?.map((i) => i.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });
});

describe("NicheMenuItem — coffee-bar niche", () => {
  const coffeeBar = getNiche("coffee-bar");

  it("coffee-bar niche exists and has menuItems", () => {
    expect(coffeeBar).toBeDefined();
    expect(Array.isArray(coffeeBar?.menuItems)).toBe(true);
    expect(coffeeBar?.menuItems?.length).toBe(8);
  });

  it("every coffee-bar item has required fields", () => {
    coffeeBar?.menuItems?.forEach((item) => {
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.category).toBeTruthy();
      expect(item.price).toBeTruthy();
      expect(item.icon).toBeTruthy();
      expect(item.gradient).toBeTruthy();
    });
  });

  it("all coffee-bar ids are unique", () => {
    const ids = coffeeBar?.menuItems?.map((i) => i.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(coffeeBar?.menuItems?.map((i) => i.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });

  it("at least one item has a badge", () => {
    const withBadge = coffeeBar?.menuItems?.filter((i) => i.badge) ?? [];
    expect(withBadge.length).toBeGreaterThan(0);
  });
});

describe("NicheProjectCard — construction niche", () => {
  const construction = getNiche("construction");

  it("construction niche exists and has projectCards", () => {
    expect(construction).toBeDefined();
    expect(Array.isArray(construction?.projectCards)).toBe(true);
    expect((construction?.projectCards?.length ?? 0)).toBeGreaterThanOrEqual(4);
  });

  it("every project card has required fields", () => {
    construction?.projectCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.area).toBeTruthy();
      expect(p.duration).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });

  it("all project ids are unique", () => {
    const ids = construction?.projectCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gradient strings are valid Tailwind from-X to-Y format", () => {
    construction?.projectCards?.forEach((p) => {
      expect(p.gradient).toMatch(/^from-\S+ to-\S+/);
    });
  });

  it("covers at least 3 distinct categories", () => {
    const categories = new Set(construction?.projectCards?.map((p) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(3);
  });
});

describe("NicheProductCard — agriculture niche", () => {
  const agriculture = getNiche("agriculture");

  it("agriculture niche exists and has productCards", () => {
    expect(agriculture).toBeDefined();
    expect(Array.isArray(agriculture?.productCards)).toBe(true);
    expect(agriculture?.productCards?.length).toBe(8);
  });

  it("every farm product has required fields", () => {
    agriculture?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
      expect(Array.isArray(p.sizes)).toBe(true);
      expect(p.sizes.length).toBeGreaterThan(0);
    });
  });

  it("all ids are unique", () => {
    const ids = agriculture?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has catalogHeading override", () => {
    expect(agriculture?.catalogHeading).toBeTruthy();
  });

  it("covers at least 4 distinct categories", () => {
    const categories = new Set(agriculture?.productCards?.map((p) => p.category));
    expect(categories.size).toBeGreaterThanOrEqual(4);
  });
});

describe("NicheProductCard — veterinary niche", () => {
  const veterinary = getNiche("veterinary");

  it("veterinary niche exists and has productCards", () => {
    expect(veterinary).toBeDefined();
    expect(Array.isArray(veterinary?.productCards)).toBe(true);
    expect(veterinary?.productCards?.length).toBe(8);
  });

  it("every pet product has required fields", () => {
    veterinary?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });

  it("all ids are unique", () => {
    const ids = veterinary?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has catalogHeading override", () => {
    expect(veterinary?.catalogHeading).toBeTruthy();
  });

  it("at least one product is on sale (has originalPrice)", () => {
    const onSale = veterinary?.productCards?.filter((p) => p.originalPrice) ?? [];
    expect(onSale.length).toBeGreaterThan(0);
  });
});

// ── NicheProductCard — beauty ─────────────────────────────────────────────
const beauty = getNiche("beauty");
describe("NicheProductCard — beauty", () => {
  it("has 8 productCards", () => {
    expect(Array.isArray(beauty?.productCards)).toBe(true);
    expect(beauty?.productCards?.length).toBe(8);
  });
  it("every procedure has required fields", () => {
    beauty?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
  it("catalogHeading is set", () => { expect(beauty?.catalogHeading).toBeTruthy(); });
  it("has at least one badge", () => {
    expect(beauty?.productCards?.some((p) => p.badge)).toBe(true);
  });
});

// ── NicheProductCard — medical ────────────────────────────────────────────
const medical = getNiche("medical");
describe("NicheProductCard — medical", () => {
  it("has 6 productCards", () => {
    expect(medical?.productCards?.length).toBe(6);
  });
  it("every package has required fields", () => {
    medical?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
  it("at least one package has originalPrice (discount)", () => {
    expect(medical?.productCards?.some((p) => p.originalPrice)).toBe(true);
  });
  it("catalogHeading is set", () => { expect(medical?.catalogHeading).toBeTruthy(); });
});

// ── NicheProductCard — pharmacy ───────────────────────────────────────────
const pharmacy = getNiche("pharmacy");
describe("NicheProductCard — pharmacy", () => {
  it("has 8 productCards", () => {
    expect(pharmacy?.productCards?.length).toBe(8);
  });
  it("every product has required fields", () => {
    pharmacy?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
  it("has SALE items", () => {
    expect(pharmacy?.productCards?.some((p) => p.originalPrice)).toBe(true);
  });
});

// ── NicheProductCard — cleaning ───────────────────────────────────────────
const cleaning = getNiche("cleaning");
describe("NicheProductCard — cleaning", () => {
  it("has 6 productCards", () => {
    expect(cleaning?.productCards?.length).toBe(6);
  });
  it("every service has required fields", () => {
    cleaning?.productCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
  it("catalogHeading is set", () => { expect(cleaning?.catalogHeading).toBeTruthy(); });
});

// ── NicheProjectCard — law ────────────────────────────────────────────────
const law = getNiche("law");
describe("NicheProjectCard — law", () => {
  it("has 6 projectCards", () => {
    expect(law?.projectCards?.length).toBe(6);
  });
  it("every case has required fields", () => {
    law?.projectCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.category).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.icon).toBeTruthy();
      expect(p.gradient).toBeTruthy();
    });
  });
  it("projectsHeading is set", () => { expect(law?.projectsHeading).toBeTruthy(); });
});

// ── NicheProjectCard — consulting ─────────────────────────────────────────
const consulting = getNiche("consulting");
describe("NicheProjectCard — consulting", () => {
  it("has 6 projectCards", () => {
    expect(consulting?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(consulting?.projectsHeading).toBeTruthy(); });
  it("every case has required fields", () => {
    consulting?.projectCards?.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.description).toBeTruthy();
    });
  });
});

// ── NicheProjectCard — logistics ──────────────────────────────────────────
const logistics = getNiche("logistics");
describe("NicheProjectCard — logistics", () => {
  it("has 6 projectCards", () => {
    expect(logistics?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(logistics?.projectsHeading).toBeTruthy(); });
  it("has urgent delivery item", () => {
    expect(logistics?.projectCards?.some((p) => p.badge)).toBe(true);
  });
});

// ── NicheProjectCard — photographer ──────────────────────────────────────
const photographer = getNiche("photographer");
describe("NicheProjectCard — photographer", () => {
  it("has 6 projectCards", () => {
    expect(photographer?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(photographer?.projectsHeading).toBeTruthy(); });
  it("every session has area and duration", () => {
    photographer?.projectCards?.forEach((p) => {
      expect(p.area).toBeTruthy();
      expect(p.duration).toBeTruthy();
    });
  });
});

// ── NicheProjectCard — events ─────────────────────────────────────────────
const events = getNiche("events");
describe("NicheProjectCard — events", () => {
  it("has 6 projectCards", () => {
    expect(events?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(events?.projectsHeading).toBeTruthy(); });
});

// ── NicheProjectCard — saas ───────────────────────────────────────────────
const saas = getNiche("saas");
describe("NicheProjectCard — saas", () => {
  it("has 6 projectCards", () => {
    expect(saas?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(saas?.projectsHeading).toBeTruthy(); });
});

// ── NicheProjectCard — ngo ────────────────────────────────────────────────
const ngo = getNiche("ngo");
describe("NicheProjectCard — ngo", () => {
  it("has 6 projectCards", () => {
    expect(ngo?.projectCards?.length).toBe(6);
  });
  it("projectsHeading is set", () => { expect(ngo?.projectsHeading).toBeTruthy(); });
  it("all ids are unique", () => {
    const ids = ngo?.projectCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ── NicheCourseCard — psychology ──────────────────────────────────────────
const psychology = getNiche("psychology");
describe("NicheCourseCard — psychology", () => {
  it("has 6 courseCards", () => {
    expect(psychology?.courseCards?.length).toBe(6);
  });
  it("courseHeading is set", () => { expect(psychology?.courseHeading).toBeTruthy(); });
  it("every program has required fields", () => {
    psychology?.courseCards?.forEach((c) => {
      expect(c.id).toBeTruthy();
      expect(c.title).toBeTruthy();
      expect(c.instructor).toBeTruthy();
      expect(c.price).toBeTruthy();
      expect(c.icon).toBeTruthy();
    });
  });
});

// ── NicheProductCard — tattoo-spa ─────────────────────────────────────────
const tattooSpa = getNiche("tattoo-spa");
describe("NicheProductCard — tattoo-spa", () => {
  it("has 8 productCards", () => {
    expect(tattooSpa?.productCards?.length).toBe(8);
  });
  it("catalogHeading is set", () => { expect(tattooSpa?.catalogHeading).toBeTruthy(); });
  it("has both tattoo and spa services", () => {
    const categories = tattooSpa?.productCards?.map((p) => p.category) ?? [];
    expect(categories.some((c) => c === "Тату")).toBe(true);
    expect(categories.some((c) => c === "SPA")).toBe(true);
  });
});

// ── NicheScheduleItem — kids-center ───────────────────────────────────────
const kidsCenter = getNiche("kids-center");
describe("NicheScheduleItem — kids-center", () => {
  it("has 6 scheduleItems", () => {
    expect(kidsCenter?.scheduleItems?.length).toBe(6);
  });
  it("scheduleHeading is set", () => { expect(kidsCenter?.scheduleHeading).toBeTruthy(); });
  it("every class has spots and spotsLeft", () => {
    kidsCenter?.scheduleItems?.forEach((s) => {
      expect(s.spots).toBeGreaterThan(0);
      expect(s.spotsLeft).toBeGreaterThanOrEqual(0);
      expect(s.spotsLeft).toBeLessThanOrEqual(s.spots);
    });
  });
});

// ── NicheProductCard — entertainment ─────────────────────────────────────
const entertainment = getNiche("entertainment");
describe("NicheProductCard — entertainment", () => {
  it("has 6 productCards (quest rooms)", () => {
    expect(entertainment?.productCards?.length).toBe(6);
  });
  it("catalogHeading is set", () => { expect(entertainment?.catalogHeading).toBeTruthy(); });
  it("has VIP room", () => {
    expect(entertainment?.productCards?.some((p) => p.badge === "VIP")).toBe(true);
  });
});

// ── NicheProductCard — craft ──────────────────────────────────────────────
const craft = getNiche("craft");
describe("NicheProductCard — craft", () => {
  it("has 8 productCards", () => {
    expect(craft?.productCards?.length).toBe(8);
  });
  it("catalogHeading is set", () => { expect(craft?.catalogHeading).toBeTruthy(); });
  it("all ids are unique", () => {
    const ids = craft?.productCards?.map((p) => p.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });
});

// ── NicheJobCard — recruitment ────────────────────────────────────────────
const recruitment = getNiche("recruitment");
describe("NicheJobCard — recruitment", () => {
  it("has 6 jobCards", () => {
    expect(recruitment?.jobCards?.length).toBe(6);
  });
  it("every job has required fields", () => {
    recruitment?.jobCards?.forEach((j) => {
      expect(j.id).toBeTruthy();
      expect(j.title).toBeTruthy();
      expect(j.company).toBeTruthy();
      expect(j.salary).toBeTruthy();
      expect(j.location).toBeTruthy();
      expect(j.type).toBeTruthy();
      expect(j.experience).toBeTruthy();
      expect(j.icon).toBeTruthy();
      expect(j.gradient).toBeTruthy();
    });
  });
  it("all job ids are unique", () => {
    const ids = recruitment?.jobCards?.map((j) => j.id) ?? [];
    expect(new Set(ids).size).toBe(ids.length);
  });
  it("has at least one remote or hybrid job", () => {
    expect(recruitment?.jobCards?.some((j) => j.location.includes("Remote"))).toBe(true);
  });
});

// ── NicheProductCard — food-delivery ─────────────────────────────────────
const foodDelivery = getNiche("food-delivery");
describe("NicheProductCard — food-delivery", () => {
  it("has 6 product cards", () => {
    expect(foodDelivery?.productCards).toHaveLength(6);
  });
  it("has varied categories (Суші, Піца, Бургери, etc.)", () => {
    const cats = new Set(foodDelivery?.productCards?.map((p) => p.category));
    expect(cats.size).toBeGreaterThanOrEqual(4);
  });
  it("all have sizes array", () => {
    foodDelivery?.productCards?.forEach((p) => {
      expect(p.sizes.length).toBeGreaterThanOrEqual(1);
    });
  });
});

// ── NicheProductCard — bakery ────────────────────────────────────────────
const bakery = getNiche("bakery");
describe("NicheProductCard — bakery", () => {
  it("has 6 product cards", () => {
    expect(bakery?.productCards).toHaveLength(6);
  });
  it("includes торти, випічка, десерти categories", () => {
    const cats = bakery?.productCards?.map((p) => p.category) ?? [];
    expect(cats.some((c) => c.includes("Торти"))).toBe(true);
    expect(cats.some((c) => c.includes("Випічка") || c.includes("Десерт"))).toBe(true);
  });
});

// ── NicheProductCard — coffee-bar ────────────────────────────────────────
const coffeeBar = getNiche("coffee-bar");
describe("NicheProductCard — coffee-bar", () => {
  it("has 6 product cards", () => {
    expect(coffeeBar?.productCards).toHaveLength(6);
  });
  it("includes кава, чай, десерти, коктейлі categories", () => {
    const cats = new Set(coffeeBar?.productCards?.map((p) => p.category));
    expect(cats.size).toBeGreaterThanOrEqual(4);
  });
  it("has at least one badge", () => {
    expect(coffeeBar?.productCards?.some((p) => p.badge)).toBe(true);
  });
});
