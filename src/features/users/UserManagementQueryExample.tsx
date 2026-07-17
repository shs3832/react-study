import { useEffect, useState, type ChangeEvent } from "react";
import { fetchUsers, HttpError } from "./api";
import type { RequestScenario } from "./types";
import { useQuery } from "@tanstack/react-query";

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

export default function UserManagementQueryExample() {
  const [scenario, setScenario] = useState<RequestScenario>("success");
  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const usersQuery = useQuery({
    queryKey: ["users", { scenario, keyword: debouncedKeyword }],
    queryFn: ({ signal }) => fetchUsers(scenario, debouncedKeyword, signal),
    retry: false,
    staleTime: 60_000,
    gcTime: 300_000,
  });

  function handleScenarioChange(nextScenario: RequestScenario) {
    if (nextScenario === scenario) {
      return;
    }
    setScenario(nextScenario);
  }

  function handleReload() {
    void usersQuery.refetch();
  }

  function handleSearchKeyword(event: ChangeEvent<HTMLInputElement>) {
    setKeyword(event.currentTarget.value);
  }

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Phase 6-C. TanStack Query</p>
        <h2>TanStack Query로 사용자 목록 관리</h2>
        <p>
          같은 검색 조건의 캐시 재사용과 재요청 상태를 화면과 DevTools
          Network에서 함께 확인해보세요.
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
            onClick={() => handleScenarioChange(item.id)}
            disabled={usersQuery.isFetching}
          >
            {item.label}
          </button>
        ))}
        <button
          type="button"
          onClick={handleReload}
          disabled={usersQuery.isFetching}
        >
          다시 불러오기
        </button>
      </div>

      {usersQuery.isPending && (
        <p className="result" role="status">
          사용자 목록을 불러오는 중입니다.
        </p>
      )}

      {usersQuery.isError && (
        <div className="request-error" role="alert">
          <strong>사용자 목록을 불러오지 못했습니다.</strong>
          <p>{getErrorMessage(usersQuery.error)}</p>
        </div>
      )}

      {usersQuery.isSuccess && usersQuery.data.length === 0 && (
        <p className="result">조건에 맞는 사용자가 없습니다.</p>
      )}

      {usersQuery.isFetching && !usersQuery.isPending && (
        <p role="status">사용자 목록을 새로고침하는 중입니다.</p>
      )}

      {usersQuery.isSuccess && usersQuery.data.length > 0 && (
        <ul className="user-list">
          {usersQuery.data.map((user) => (
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
