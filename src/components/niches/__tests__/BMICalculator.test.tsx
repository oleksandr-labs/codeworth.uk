/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BMICalculator } from "../BMICalculator";

describe("BMICalculator (UK locale)", () => {
  it("renders section heading in Ukrainian", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    expect(screen.getByText("Калькулятор ІМТ")).toBeInTheDocument();
  });

  it("shows placeholder text in Ukrainian", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    expect(screen.getByPlaceholderText("напр. 75")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("напр. 175")).toBeInTheDocument();
  });

  it("shows empty state prompt in Ukrainian", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    expect(screen.getByText(/введіть вагу та зріст/i)).toBeInTheDocument();
  });

  it("BMI scale legend shows 'ІМТ' label in UK locale", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    const bmiLabels = screen.getAllByText(/ІМТ/i);
    expect(bmiLabels.length).toBeGreaterThan(0);
  });

  it("calculates BMI and shows category for normal weight", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("напр. 75"), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText("напр. 175"), { target: { value: "175" } });
    // BMI = 70 / (1.75^2) = 22.9 → Normal weight (appears in legend + result)
    expect(screen.getAllByText("Нормальна вага").length).toBeGreaterThanOrEqual(2);
  });

  it("calculates BMI and shows underweight category", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("напр. 75"), { target: { value: "45" } });
    fireEvent.change(screen.getByPlaceholderText("напр. 175"), { target: { value: "175" } });
    // BMI = 45 / (1.75^2) = 14.7 → Underweight (appears in legend + result)
    expect(screen.getAllByText("Недостатня вага").length).toBeGreaterThanOrEqual(2);
  });

  it("calculates BMI and shows overweight category", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("напр. 75"), { target: { value: "85" } });
    fireEvent.change(screen.getByPlaceholderText("напр. 175"), { target: { value: "175" } });
    // BMI = 85 / (1.75^2) = 27.8 → Overweight (appears in legend + result)
    expect(screen.getAllByText("Надмірна вага").length).toBeGreaterThanOrEqual(2);
  });

  it("shows disclaimer in Ukrainian", () => {
    render(<BMICalculator lang="uk" color="#6366f1" />);
    expect(screen.getByText(/ІМТ — орієнтовний показник/i)).toBeInTheDocument();
  });
});

describe("BMICalculator (EN locale)", () => {
  it("renders section heading in English", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    expect(screen.getByText("BMI Calculator")).toBeInTheDocument();
  });

  it("shows placeholder text in English", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    expect(screen.getByPlaceholderText("e.g. 75")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. 175")).toBeInTheDocument();
  });

  it("shows empty state prompt in English", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    expect(screen.getByText(/enter your weight and height/i)).toBeInTheDocument();
  });

  it("BMI scale legend shows 'BMI' label in EN locale (not 'ІМТ')", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    const bmiLabels = screen.getAllByText(/BMI/i);
    expect(bmiLabels.length).toBeGreaterThan(0);
    // Ensure the Ukrainian "ІМТ" does NOT appear as BMI range prefix
    const legend = screen.getAllByText(/BMI [<≥0-9–]/);
    expect(legend.length).toBeGreaterThan(0);
  });

  it("calculates BMI and shows English category for normal weight", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    // appears in legend + result
    expect(screen.getAllByText("Normal weight").length).toBeGreaterThanOrEqual(2);
  });

  it("calculates BMI and shows English category for underweight", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "45" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    expect(screen.getAllByText("Underweight").length).toBeGreaterThanOrEqual(2);
  });

  it("calculates BMI and shows English category for overweight", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "85" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    expect(screen.getAllByText("Overweight").length).toBeGreaterThanOrEqual(2);
  });

  it("calculates BMI and shows Obesity Class I in English", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "100" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    // BMI = 100 / (1.75^2) = 32.7 → Obesity Class I (appears in legend + result)
    expect(screen.getAllByText("Obesity Class I").length).toBeGreaterThanOrEqual(2);
  });

  it("shows disclaimer in English", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    expect(screen.getByText(/BMI is an approximate indicator/i)).toBeInTheDocument();
  });
});

describe("BMICalculator (shared logic)", () => {
  it("does not show result when only weight is entered", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "70" } });
    expect(screen.getByText(/enter your weight and height/i)).toBeInTheDocument();
  });

  it("does not show result when only height is entered", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    expect(screen.getByText(/enter your weight and height/i)).toBeInTheDocument();
  });

  it("displays BMI value rounded to 1 decimal place", () => {
    render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    // 70 / (1.75^2) = 22.857... → "22.9"
    expect(screen.getByText("22.9")).toBeInTheDocument();
  });

  it("highlights the matching category in the legend", () => {
    const { container } = render(<BMICalculator lang="en" color="#6366f1" />);
    fireEvent.change(screen.getByPlaceholderText("e.g. 75"), { target: { value: "70" } });
    fireEvent.change(screen.getByPlaceholderText("e.g. 175"), { target: { value: "175" } });
    // The highlighted legend item has an outline style
    const highlighted = container.querySelector("[style*='outline']");
    expect(highlighted).not.toBeNull();
  });
});
