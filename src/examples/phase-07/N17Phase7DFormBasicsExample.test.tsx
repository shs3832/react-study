import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import N14Phase7AFormBasicsExample from "./N14Phase7AFormBasicsExample";

describe("Phase 7-D Form 기본 원리", () => {
  it("이름 입력란과 제출 버튼을 제공한다", () => {
    render(<N14Phase7AFormBasicsExample />);

    expect(screen.getByRole("textbox", { name: "이름" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "제출" })).toBeInTheDocument();
  });

  it("빈 이름으로 제출하면 오류 상태를 표시하고 이름 입력란으로 포커스를 이동한다", async () => {
    const user = userEvent.setup();

    render(<N14Phase7AFormBasicsExample />);
    const nameInput = screen.getByRole("textbox", { name: "이름" });
    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAccessibleDescription("이름을 입력해 주세요");
    expect(nameInput).toHaveFocus();
  });

  it("이름을 입력하면 controlled input과 현재 입력값을 갱신한다", async () => {
    const user = userEvent.setup();

    render(<N14Phase7AFormBasicsExample />);

    const nameInput = screen.getByRole("textbox", { name: "이름" });

    await user.type(nameInput, "Kim");

    expect(nameInput).toHaveValue("Kim");
    expect(screen.getByText("현재 입력값: Kim")).toBeInTheDocument();
  });

  it("오류 발생 후 이름을 입력하면 오류 상태를 해제한다", async () => {
    const user = userEvent.setup();

    render(<N14Phase7AFormBasicsExample />);

    const nameInput = screen.getByRole("textbox", { name: "이름" });

    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByText("이름을 입력해 주세요")).toBeInTheDocument();

    await user.type(nameInput, "Kim");

    expect(screen.queryByText("이름을 입력해 주세요")).not.toBeInTheDocument();
    expect(nameInput).not.toHaveAttribute("aria-invalid");
  });
});
