import React from "react";
import { render, screen } from "@testing-library/react";
import { FiltersDemo } from "../FiltersDemo";
import { CalculatorDemo } from "../CalculatorDemo";
import { BookingDemo } from "../BookingDemo";
import { BlogDemo } from "../BlogDemo";
import { VacancyDemo } from "../VacancyDemo";
import { GenericDemo } from "../GenericDemo";

describe("FiltersDemo", () => {
  it("renders fashion variant for UK", () => {
    const { container } = render(<FiltersDemo variant="fashion-filters" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders electronics variant for EN", () => {
    const { container } = render(<FiltersDemo variant="electronics-filters" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("CalculatorDemo", () => {
  it("renders cleaning calculator for UK", () => {
    const { container } = render(<CalculatorDemo variant="cleaning-calculator" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders construction calculator for EN", () => {
    const { container } = render(<CalculatorDemo variant="construction-calculator" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("BookingDemo", () => {
  it("renders beauty booking for UK", () => {
    const { container } = render(<BookingDemo variant="beauty-booking" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders medical booking for EN", () => {
    const { container } = render(<BookingDemo variant="medical-booking" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("BlogDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<BlogDemo variant="tech-blog" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders for EN", () => {
    const { container } = render(<BlogDemo variant="tech-blog" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("VacancyDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<VacancyDemo variant="it-vacancies" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renders for EN", () => {
    const { container } = render(<VacancyDemo variant="it-vacancies" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("GenericDemo", () => {
  it("renders before-after variant", () => {
    const { container } = render(
      <GenericDemo extraId="feat-before-after" exampleId="redesign" isUk={false} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders lead-quiz variant", () => {
    const { container } = render(
      <GenericDemo extraId="feat-lead-quiz" exampleId="real-estate-quiz" isUk={false} />
    );
    expect(container.firstChild).toBeTruthy();
  });

  it("renders FOMO variant", () => {
    const { container } = render(
      <GenericDemo extraId="feat-fomo" exampleId="ecommerce-fomo" isUk={true} />
    );
    expect(container.firstChild).toBeTruthy();
  });
});
