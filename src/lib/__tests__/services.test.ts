import { SERVICES_DATA, getService } from "../data/services";

describe("SERVICES_DATA", () => {
  it("contains 2 services (AI + ML)", () => {
    expect(SERVICES_DATA).toHaveLength(2);
  });

  it("every service has required fields", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.slug).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(s.description).toBeTruthy();
      expect(s.priceFrom).toBeTruthy();
      expect(Array.isArray(s.features)).toBe(true);
      expect(s.features.length).toBeGreaterThan(0);
    });
  });

  it("every service has exactly 3 packages with required fields", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.packages).toBeDefined();
      expect(s.packages).toHaveLength(3);
      s.packages!.forEach((pkg) => {
        expect(pkg.name).toBeTruthy();
        expect(pkg.price).toBeTruthy();
        expect(pkg.desc).toBeTruthy();
        expect(Array.isArray(pkg.features)).toBe(true);
        expect(pkg.features.length).toBeGreaterThan(0);
        expect(typeof pkg.highlight).toBe("boolean");
      });
    });
  });

  it("exactly one package per service is highlighted", () => {
    SERVICES_DATA.forEach((s) => {
      const highlighted = s.packages!.filter((p) => p.highlight);
      expect(highlighted).toHaveLength(1);
    });
  });

  it("all slugs are unique", () => {
    const slugs = SERVICES_DATA.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("all slugs are URL-safe (no spaces or special chars)", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.slug).toMatch(/^[a-z0-9-]+$/);
    });
  });

  it("priceFrom is a non-empty string", () => {
    SERVICES_DATA.forEach((s) => {
      expect(typeof s.priceFrom).toBe("string");
      expect(s.priceFrom.length).toBeGreaterThan(0);
    });
  });
});

describe("getService()", () => {
  it("returns service by valid slug", () => {
    const s = getService("artificial-intelligence");
    expect(s).toBeDefined();
    expect(s?.slug).toBe("artificial-intelligence");
  });

  it("returns undefined for unknown slug", () => {
    expect(getService("does-not-exist")).toBeUndefined();
  });

  it("returns service for every slug in SERVICES_DATA", () => {
    SERVICES_DATA.forEach((s) => {
      expect(getService(s.slug)).toBeDefined();
    });
  });
});

describe("ServiceProcessStep data", () => {
  it("every service has processSteps with 4 steps", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.processSteps).toBeDefined();
      expect(s.processSteps).toHaveLength(4);
    });
  });

  it("processSteps have sequential step numbers 1-4", () => {
    SERVICES_DATA.forEach((s) => {
      s.processSteps!.forEach((step, i) => {
        expect(step.step).toBe(i + 1);
      });
    });
  });

  it("processSteps have non-empty title and description", () => {
    SERVICES_DATA.forEach((s) => {
      s.processSteps!.forEach((step) => {
        expect(step.title.length).toBeGreaterThan(0);
        expect(step.description.length).toBeGreaterThan(0);
      });
    });
  });
});

describe("ServiceCaseStudy data", () => {
  it("every service has 3 caseStudies", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.caseStudies).toBeDefined();
      expect(s.caseStudies).toHaveLength(3);
    });
  });

  it("caseStudies have required fields", () => {
    SERVICES_DATA.forEach((s) => {
      s.caseStudies!.forEach((cs) => {
        expect(cs.client.length).toBeGreaterThan(0);
        expect(cs.niche.length).toBeGreaterThan(0);
        expect(cs.result.length).toBeGreaterThan(0);
        expect(cs.metric.length).toBeGreaterThan(0);
      });
    });
  });

  it("all client names are unique across all services", () => {
    const allClients = SERVICES_DATA.flatMap((s) => s.caseStudies!.map((cs) => cs.client));
    expect(new Set(allClients).size).toBe(allClients.length);
  });
});

describe("ServiceUseCase data", () => {
  it("every service has at least 6 useCases", () => {
    SERVICES_DATA.forEach((s) => {
      expect(s.useCases).toBeDefined();
      expect(s.useCases!.length).toBeGreaterThanOrEqual(6);
    });
  });

  it("useCases have required fields", () => {
    SERVICES_DATA.forEach((s) => {
      s.useCases!.forEach((uc) => {
        expect(uc.niche.length).toBeGreaterThan(0);
        expect(uc.emoji.length).toBeGreaterThan(0);
        expect(uc.description.length).toBeGreaterThan(10);
      });
    });
  });
});
