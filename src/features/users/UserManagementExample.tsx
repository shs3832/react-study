import { useEffect, useState, type ChangeEvent } from "react";
import { fetchUsers, HttpError } from "./api";
import type { RequestScenario, UsersState } from "./types";

const scenarios: Array<{ id: RequestScenario; label: string }> = [
  { id: "success", label: "성공" },
  { id: "empty", label: "빈 결과" },
  { id: "http-error", label: "HTTP 500" },
  { id: "network-error", label: "네트워크 오류" },
  { id: "invalid-data", label: "잘못된 응답" },
];

function getErrorMessage(error: unknown) {
  if (error instanceof HttpError) {
    return `서버가 HTTP ${error.status} 오류를 응답했습니다.`;
  }

  if (error instanceof TypeError) {
    return "서버 응답을 받지 못했습니다. 네트워크 연결을 확인해주세요.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}

export default function UserManagementExample() {
  const [scenario, setScenario] = useState<RequestScenario>("success");
  const [requestCount, setRequestCount] = useState(0);
  const [usersState, setUsersState] = useState<UsersState>({
    status: "loading",
  });
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function loadUsers() {
      try {
        const users = await fetchUsers(scenario, keyword, controller.signal);
        if (ignore) {
          return;
        }
        if (users.length === 0) {
          setUsersState({ status: "empty" });
          return;
        }

        setUsersState({ status: "success", users });
      } catch (error) {
        const isAbortError =
          error instanceof Error && error.name === "AbortError";

        if (ignore || isAbortError) {
          return;
        }
        setUsersState({ status: "error", message: getErrorMessage(error) });
      }
    }

    const timerId = window.setTimeout(() => {
      void loadUsers();
    }, 500);
    return () => {
      ignore = true;
      controller.abort();
      window.clearTimeout(timerId);
    };
  }, [requestCount, scenario, keyword]);

  function handleScenarioChange(nextScenario: RequestScenario) {
    if (nextScenario === scenario) {
      return;
    }
    setUsersState({ status: "loading" });
    setScenario(nextScenario);
  }

  function handleReload() {
    setUsersState({ status: "loading" });
    setRequestCount((prev) => prev + 1);
  }

  function handleSearchKeyword(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.currentTarget.value);
    setUsersState({ status: "loading" });
  }

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Phase 6-B. Request control</p>
        <h2>사용자 검색 요청 제어</h2>
        <p>
          검색어를 빠르게 입력한 뒤 화면과 DevTools Network 요청 수와 취소
          상태를 함께 확인해보세요.
        </p>
      </div>

      <div className="button-group" aria-label="사용자 요청 상태 선택">
        <label htmlFor="user-keyword">사용자 검색</label>
        <input
          id="user-keyword"
          type="search"
          value={keyword}
          onChange={handleSearchKeyword}
        />
        {scenarios.map((item) => (
          <button
            key={item.id}
            type="button"
            className={scenario === item.id ? "is-active" : ""}
            aria-pressed={scenario === item.id}
            disabled={usersState.status === "loading"}
            onClick={() => handleScenarioChange(item.id)}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleReload}
          disabled={usersState.status === "loading"}
        >
          다시 불러오기
        </button>
      </div>

      {usersState.status === "loading" && (
        <p className="result" role="status">
          사용자 목록을 불러오는 중입니다.
        </p>
      )}

      {usersState.status === "error" && (
        <div className="request-error" role="alert">
          <strong>사용자 목록을 불러오지 못했습니다.</strong>
          <p>{usersState.message}</p>
        </div>
      )}

      {usersState.status === "empty" && (
        <p className="result">조건에 맞는 사용자가 없습니다.</p>
      )}

      {usersState.status === "success" && (
        <ul className="user-list">
          {usersState.users.map((user) => (
            <li key={user.id}>
              <div>
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
              <span>{user.department ?? "부서 정보 없음"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
