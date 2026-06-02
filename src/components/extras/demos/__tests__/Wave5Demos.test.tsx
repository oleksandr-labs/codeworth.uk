import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { VirtualTourDemo } from "../VirtualTourDemo";
import { LiveChatDemo } from "../LiveChatDemo";

expect.extend(toHaveNoViolations);

describe("VirtualTourDemo", () => {
  it("renders 3 scene switcher buttons", () => {
    render(<VirtualTourDemo isUk={true} />);
    expect(screen.getByText("Лобі")).toBeInTheDocument();
    expect(screen.getByText("Делюкс номер")).toBeInTheDocument();
    expect(screen.getByText("Спа-зона")).toBeInTheDocument();
  });

  it("switches scenes", () => {
    render(<VirtualTourDemo isUk={false} />);
    fireEvent.click(screen.getByText("Spa Area"));
    expect(screen.getByText(/2 \/ 3|3 \/ 3/)).toBeInTheDocument();
  });

  it("renders navigation arrows", () => {
    render(<VirtualTourDemo isUk={false} />);
    expect(screen.getByLabelText("Pan left")).toBeInTheDocument();
    expect(screen.getByLabelText("Pan right")).toBeInTheDocument();
  });

  it("opens hotspot dialog on click", () => {
    render(<VirtualTourDemo isUk={false} />);
    const hotspot = screen.getByLabelText("Reception");
    fireEvent.click(hotspot);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<VirtualTourDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

describe("LiveChatDemo", () => {
  it("renders chat widget open by default", () => {
    render(<LiveChatDemo isUk={true} />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Олена")).toBeInTheDocument();
  });

  it("renders quick reply buttons initially", () => {
    render(<LiveChatDemo isUk={false} />);
    expect(screen.getByText("Pricing question")).toBeInTheDocument();
    expect(screen.getByText("Project timeline")).toBeInTheDocument();
    expect(screen.getByText("Book consultation")).toBeInTheDocument();
  });

  it("sends message on submit", () => {
    render(<LiveChatDemo isUk={false} />);
    const input = screen.getByLabelText("Message") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Hello there" } });
    const sendBtn = screen.getByLabelText("Send");
    fireEvent.click(sendBtn);
    expect(screen.getByText("Hello there")).toBeInTheDocument();
  });

  it("closes chat widget", () => {
    render(<LiveChatDemo isUk={false} />);
    const closeBtn = screen.getByLabelText("Close");
    fireEvent.click(closeBtn);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    // Floating button should appear
    expect(screen.getByLabelText("Open chat")).toBeInTheDocument();
  });

  it("disables send button when input is empty", () => {
    render(<LiveChatDemo isUk={false} />);
    const sendBtn = screen.getByLabelText("Send");
    expect(sendBtn).toBeDisabled();
  });

  it("has no a11y violations", async () => {
    const { container } = render(<LiveChatDemo isUk={false} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
