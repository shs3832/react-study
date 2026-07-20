import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import N16Phase7CFormActionExample from "./N16Phase7CFormActionExample";

describe("Phase 7-D React 19 Form Action", () => {
  it("제출 중에는 버튼을 비활성화하고 완료 후 성공 메시지를 표시한다", async () => {
    const user = userEvent.setup();

    render(<N16Phase7CFormActionExample />);

    const nameInput = screen.getByRole("textbox", { name: "이름" });

    await user.type(nameInput, "Kim");
    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByRole("button", { name: "제출 중..." })).toBeDisabled();

    expect(
      await screen.findByRole("status", {}, { timeout: 3000 }),
    ).toHaveTextContent("전송 완료");

    expect(screen.getByRole("button", { name: "제출" })).toBeEnabled();
    expect(nameInput).toHaveValue("");
  });

  it("빈 이름으로 제출하면 필드 오류를 input에 연결한다", async () => {
    const user = userEvent.setup();

    render(<N16Phase7CFormActionExample />);

    const nameInput = screen.getByRole("textbox", { name: "이름" });

    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "이름을 입력해 주세요.",
    );

    expect(nameInput).toHaveAttribute("aria-invalid", "true");
    expect(nameInput).toHaveAccessibleDescription("이름을 입력해 주세요.");
  });

  it("서버 오류 state를 반환하면 form 전체 오류를 표시하고 input을 초기화한다", async () => {
    const user = userEvent.setup();

    render(<N16Phase7CFormActionExample />);

    const nameInput = screen.getByRole("textbox", { name: "이름" });

    await user.type(nameInput, "server-error");
    await user.click(screen.getByRole("button", { name: "제출" }));

    expect(
      await screen.findByRole("alert", {}, { timeout: 3000 }),
    ).toHaveTextContent(
      "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
    );

    expect(nameInput).toHaveAttribute("aria-invalid", "false");
    expect(nameInput).toHaveValue("");
  });
});
