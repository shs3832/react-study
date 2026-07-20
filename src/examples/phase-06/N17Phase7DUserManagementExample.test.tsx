import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { server } from "../../test/mocks/server";
import N11N12UserManagementExample from "./N11N12UserManagementExample";

describe("Phase 7-D 사용자 검색 요청 제어", () => {
  it("API 응답을 화면용 사용자 정보로 변환해 표시한다", async () => {
    server.use(
      http.get("https://dummyjson.com/users/search", () => {
        return HttpResponse.json({
          users: [
            {
              id: 1,
              firstName: "Kim",
              lastName: "Lee",
              email: "kim@example.com",
              company: {
                department: "UI",
              },
            },
          ],
        });
      }),
    );

    render(<N11N12UserManagementExample />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "사용자 목록을 불러오는 중입니다.",
    );

    expect(
      await screen.findByText("Kim Lee", {}, { timeout: 1500 }),
    ).toBeInTheDocument();

    expect(screen.getByText("kim@example.com")).toBeInTheDocument();
    expect(screen.getByText("UI")).toBeInTheDocument();

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("HTTP 500 응답을 사용자 오류 메시지로 표시한다", async () => {
    const user = userEvent.setup();

    server.use(
      http.get("https://dummyjson.com/users/search", () => {
        return HttpResponse.json({
          users: [
            {
              id: 1,
              firstName: "Kim",
              lastName: "Lee",
              email: "kim@example.com",
              company: {
                department: "UI",
              },
            },
          ],
        });
      }),
      http.get("https://dummyjson.com/http/500/Phase_6_error", () => {
        return HttpResponse.json({}, { status: 500 });
      }),
    );

    render(<N11N12UserManagementExample />);

    await screen.findByText("Kim Lee", {}, { timeout: 1500 });

    await user.click(screen.getByRole("button", { name: "HTTP 500" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "사용자 목록을 불러오는 중입니다.",
    );

    expect(
      await screen.findByRole("alert", {}, { timeout: 1500 }),
    ).toHaveTextContent("서버가 HTTP 500 오류를 응답했습니다.");
  });
});
