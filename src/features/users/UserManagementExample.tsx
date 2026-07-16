import { useEffect, useState } from "react";
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

  useEffect(() => {
    async function loadUsers() {
      try {
        const users = await fetchUsers(scenario);

        if (users.length === 0) {
          setUsersState({ status: "empty" });
          return;
        }

        setUsersState({ status: "success", users });
      } catch (error) {
        setUsersState({ status: "error", message: getErrorMessage(error) });
      }
    }

    void loadUsers();
  }, [requestCount, scenario]);

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

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Phase 6-A. Direct fetch</p>
        <h2>사용자 목록과 Server State</h2>
        <p>
          요청 상태를 선택한 뒤 화면과 DevTools Network 결과를 함께
          확인해보세요.
        </p>
      </div>

      <div className="button-group" aria-label="사용자 요청 상태 선택">
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
