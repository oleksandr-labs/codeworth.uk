import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, Textarea, Select, Checkbox, RadioGroup } from "../ui/FormElements";

describe("Input", () => {
  it("renders with label", () => {
    render(<Input id="name" label="Ім'я" />);
    expect(screen.getByLabelText(/Ім'я/i)).toBeInTheDocument();
  });

  it("renders placeholder", () => {
    render(<Input id="email" label="Email" placeholder="your@email.com" />);
    expect(screen.getByPlaceholderText("your@email.com")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Input id="name" label="Ім'я" error="Поле обов'язкове" />);
    expect(screen.getByRole("alert")).toHaveTextContent(/Поле обов'язкове/i);
  });

  it("shows success message", () => {
    render(<Input id="name" label="Ім'я" success="Виглядає добре" />);
    expect(screen.getByText(/Виглядає добре/i)).toBeInTheDocument();
  });

  it("applies required mark when required", () => {
    render(<Input id="name" label="Ім'я" required />);
    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("sets aria-invalid when error is present", () => {
    render(<Input id="name" label="Ім'я" error="Помилка" />);
    const input = screen.getByLabelText(/Ім'я/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("does not set aria-invalid without error", () => {
    render(<Input id="name" label="Ім'я" />);
    const input = screen.getByLabelText(/Ім'я/i);
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Input id="name" label="Ім'я" />);
    const input = screen.getByLabelText(/Ім'я/i);
    await user.type(input, "Іван");
    expect(input).toHaveValue("Іван");
  });

  it("shows hint when no error or success", () => {
    render(<Input id="name" label="Ім'я" hint="Введіть повне ім'я" />);
    expect(screen.getByText(/Введіть повне ім'я/i)).toBeInTheDocument();
  });

  it("hides hint when error is present", () => {
    render(<Input id="name" label="Ім'я" hint="Підказка" error="Помилка" />);
    expect(screen.queryByText("Підказка")).not.toBeInTheDocument();
  });
});

describe("Textarea", () => {
  it("renders with label", () => {
    render(<Textarea id="msg" label="Повідомлення" />);
    expect(screen.getByLabelText(/Повідомлення/i)).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(<Textarea id="msg" label="Повідомлення" error="Введіть текст" />);
    expect(screen.getByRole("alert")).toHaveTextContent(/Введіть текст/i);
  });

  it("accepts user input", async () => {
    const user = userEvent.setup();
    render(<Textarea id="msg" label="Повідомлення" />);
    const textarea = screen.getByLabelText(/Повідомлення/i);
    await user.type(textarea, "Привіт");
    expect(textarea).toHaveValue("Привіт");
  });
});

describe("Select", () => {
  const options = [
    { value: "web", label: "Веб-сайт" },
    { value: "shop", label: "Магазин" },
  ];

  it("renders with label", () => {
    render(<Select id="svc" label="Послуга" options={options} />);
    expect(screen.getByLabelText(/Послуга/i)).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<Select id="svc" label="Послуга" options={options} />);
    expect(screen.getByText("Веб-сайт")).toBeInTheDocument();
    expect(screen.getByText("Магазин")).toBeInTheDocument();
  });

  it("renders placeholder as disabled first option", () => {
    render(
      <Select id="svc" label="Послуга" options={options} placeholder="Оберіть" />
    );
    const placeholder = screen.getByRole("option", { name: "Оберіть" }) as HTMLOptionElement;
    expect(placeholder.disabled).toBe(true);
  });

  it("shows error message", () => {
    render(<Select id="svc" label="Послуга" options={options} error="Оберіть тип" />);
    expect(screen.getByRole("alert")).toHaveTextContent(/Оберіть тип/i);
  });

  it("can change selection", async () => {
    const user = userEvent.setup();
    render(<Select id="svc" label="Послуга" options={options} />);
    const select = screen.getByLabelText(/Послуга/i) as HTMLSelectElement;
    await user.selectOptions(select, "shop");
    expect(select.value).toBe("shop");
  });
});

describe("Checkbox", () => {
  it("renders with label", () => {
    render(<Checkbox id="agree" label="Погоджуюсь" />);
    expect(screen.getByLabelText(/Погоджуюсь/i)).toBeInTheDocument();
  });

  it("can be checked", async () => {
    const user = userEvent.setup();
    render(<Checkbox id="agree" label="Погоджуюсь" />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("shows error message", () => {
    render(<Checkbox id="agree" label="Погоджуюсь" error="Обов'язково погодитись" />);
    expect(screen.getByRole("alert")).toHaveTextContent(/Обов'язково/i);
  });

  it("renders description when provided", () => {
    render(
      <Checkbox id="agree" label="Погоджуюсь" description="Прочитайте умови" />
    );
    expect(screen.getByText("Прочитайте умови")).toBeInTheDocument();
  });
});

describe("RadioGroup", () => {
  const options = [
    { value: "a", label: "Варіант А" },
    { value: "b", label: "Варіант Б" },
    { value: "c", label: "Варіант В", disabled: true },
  ];

  it("renders all options", () => {
    render(
      <RadioGroup name="test" value="a" onChange={() => {}} options={options} />
    );
    expect(screen.getByText("Варіант А")).toBeInTheDocument();
    expect(screen.getByText("Варіант Б")).toBeInTheDocument();
    expect(screen.getByText("Варіант В")).toBeInTheDocument();
  });

  it("shows the label", () => {
    render(
      <RadioGroup
        name="test"
        value="a"
        onChange={() => {}}
        options={options}
        label="Оберіть варіант"
      />
    );
    expect(screen.getByText("Оберіть варіант")).toBeInTheDocument();
  });

  it("marks correct option as checked", () => {
    render(
      <RadioGroup name="test" value="b" onChange={() => {}} options={options} />
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).not.toBeChecked();
    expect(radios[1]).toBeChecked();
  });

  it("calls onChange when option is clicked", async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(
      <RadioGroup name="test" value="a" onChange={onChange} options={options} />
    );
    await user.click(screen.getByText("Варіант Б"));
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("shows error message", () => {
    render(
      <RadioGroup
        name="test"
        value=""
        onChange={() => {}}
        options={options}
        error="Оберіть варіант"
      />
    );
    expect(screen.getByRole("alert")).toHaveTextContent(/Оберіть варіант/i);
  });
});
