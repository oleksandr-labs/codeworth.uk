/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs } from "../Tabs";

const TABS = [
  { id: "tab1", label: "Перший" },
  { id: "tab2", label: "Другий" },
  { id: "tab3", label: "Третій" },
];

describe("Tabs", () => {
  it("рендерить всі таби", () => {
    render(<Tabs tabs={TABS}>{() => null}</Tabs>);
    expect(screen.getByRole("tab", { name: "Перший" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Другий" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Третій" })).toBeInTheDocument();
  });

  it("перший таб активний за замовчуванням", () => {
    render(<Tabs tabs={TABS}>{(active) => <div>Активний: {active}</div>}</Tabs>);
    expect(screen.getByText("Активний: tab1")).toBeInTheDocument();
  });

  it("defaultTab встановлює початковий активний таб", () => {
    render(
      <Tabs tabs={TABS} defaultTab="tab2">
        {(active) => <div>Активний: {active}</div>}
      </Tabs>
    );
    expect(screen.getByText("Активний: tab2")).toBeInTheDocument();
  });

  it("клік по табу змінює активний таб", () => {
    render(<Tabs tabs={TABS}>{(active) => <div>Активний: {active}</div>}</Tabs>);
    fireEvent.click(screen.getByRole("tab", { name: "Третій" }));
    expect(screen.getByText("Активний: tab3")).toBeInTheDocument();
  });

  it("render prop отримує поточний активний tab id", () => {
    const renderFn = jest.fn().mockReturnValue(<div>content</div>);
    render(<Tabs tabs={TABS}>{renderFn}</Tabs>);
    expect(renderFn).toHaveBeenCalledWith("tab1");
  });

  it("після кліку render prop викликається з новим tab id", () => {
    const renderFn = jest.fn().mockReturnValue(<div>content</div>);
    render(<Tabs tabs={TABS}>{renderFn}</Tabs>);
    fireEvent.click(screen.getByRole("tab", { name: "Другий" }));
    expect(renderFn).toHaveBeenLastCalledWith("tab2");
  });

  it("ArrowRight переключає на наступний таб", () => {
    render(<Tabs tabs={TABS}>{(active) => <div>Активний: {active}</div>}</Tabs>);
    const firstTab = screen.getByRole("tab", { name: "Перший" });
    fireEvent.keyDown(firstTab, { key: "ArrowRight" });
    expect(screen.getByText("Активний: tab2")).toBeInTheDocument();
  });

  it("ArrowLeft переключає на попередній таб", () => {
    render(<Tabs tabs={TABS} defaultTab="tab2">{(active) => <div>Активний: {active}</div>}</Tabs>);
    const secondTab = screen.getByRole("tab", { name: "Другий" });
    fireEvent.keyDown(secondTab, { key: "ArrowLeft" });
    expect(screen.getByText("Активний: tab1")).toBeInTheDocument();
  });

  it("ArrowRight на останньому табі переходить на перший (циклічно)", () => {
    render(<Tabs tabs={TABS} defaultTab="tab3">{(active) => <div>Активний: {active}</div>}</Tabs>);
    const lastTab = screen.getByRole("tab", { name: "Третій" });
    fireEvent.keyDown(lastTab, { key: "ArrowRight" });
    expect(screen.getByText("Активний: tab1")).toBeInTheDocument();
  });

  it("ArrowLeft на першому табі переходить на останній (циклічно)", () => {
    render(<Tabs tabs={TABS}>{(active) => <div>Активний: {active}</div>}</Tabs>);
    const firstTab = screen.getByRole("tab", { name: "Перший" });
    fireEvent.keyDown(firstTab, { key: "ArrowLeft" });
    expect(screen.getByText("Активний: tab3")).toBeInTheDocument();
  });

  it("Home переходить до першого табу", () => {
    render(<Tabs tabs={TABS} defaultTab="tab3">{(active) => <div>Активний: {active}</div>}</Tabs>);
    const lastTab = screen.getByRole("tab", { name: "Третій" });
    fireEvent.keyDown(lastTab, { key: "Home" });
    expect(screen.getByText("Активний: tab1")).toBeInTheDocument();
  });

  it("End переходить до останнього табу", () => {
    render(<Tabs tabs={TABS}>{(active) => <div>Активний: {active}</div>}</Tabs>);
    const firstTab = screen.getByRole("tab", { name: "Перший" });
    fireEvent.keyDown(firstTab, { key: "End" });
    expect(screen.getByText("Активний: tab3")).toBeInTheDocument();
  });

  it("активний таб має tabIndex=0, неактивні — tabIndex=-1", () => {
    render(<Tabs tabs={TABS}>{() => null}</Tabs>);
    expect(screen.getByRole("tab", { name: "Перший" })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("tab", { name: "Другий" })).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tab", { name: "Третій" })).toHaveAttribute("tabindex", "-1");
  });

  it("tabpanel має правильні ARIA атрибути", () => {
    render(<Tabs tabs={TABS}>{() => <div>Вміст</div>}</Tabs>);
    const panel = screen.getByRole("tabpanel");
    expect(panel).toHaveAttribute("id", "tabpanel-tab1");
    expect(panel).toHaveAttribute("aria-labelledby", "tab-tab1");
  });
});
