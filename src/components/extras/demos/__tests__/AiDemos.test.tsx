import React from "react";
import { render } from "@testing-library/react";

// jsdom doesn't implement scrollIntoView used by chat-style demos
Element.prototype.scrollIntoView = jest.fn();

import { AiCopywriterDemo } from "../AiCopywriterDemo";
import { AiVoiceSearchDemo } from "../AiVoiceSearchDemo";
import { AiPriceOptimizerDemo } from "../AiPriceOptimizerDemo";
import { AiEdtechDemo } from "../AiEdtechDemo";
import { AiHospitalityDemo } from "../AiHospitalityDemo";

describe("AiCopywriterDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<AiCopywriterDemo variant="default" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });
  it("renders for EN", () => {
    const { container } = render(<AiCopywriterDemo variant="default" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("AiVoiceSearchDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<AiVoiceSearchDemo variant="default" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });
  it("renders for EN", () => {
    const { container } = render(<AiVoiceSearchDemo variant="default" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("AiPriceOptimizerDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<AiPriceOptimizerDemo variant="default" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });
  it("renders for EN", () => {
    const { container } = render(<AiPriceOptimizerDemo variant="default" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("AiEdtechDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<AiEdtechDemo variant="default" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });
  it("renders for EN", () => {
    const { container } = render(<AiEdtechDemo variant="default" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});

describe("AiHospitalityDemo", () => {
  it("renders for UK", () => {
    const { container } = render(<AiHospitalityDemo variant="default" isUk={true} />);
    expect(container.firstChild).toBeTruthy();
  });
  it("renders for EN", () => {
    const { container } = render(<AiHospitalityDemo variant="default" isUk={false} />);
    expect(container.firstChild).toBeTruthy();
  });
});
