import type { RequestScenario, User } from "./types";

const USERS_API_URL = "https://dummyjson.com";

type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: {
    department?: string | null;
  };
};

type UsersResponse = {
  users: ApiUser[];
};

export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}

function getRequestUrl(scenario: RequestScenario, keyword: string) {
  switch (scenario) {
    case "success": {
      const trimmedKeyword = keyword.trim();
      const params = new URLSearchParams({
        q: trimmedKeyword,
        limit: "5",
        select: "id,firstName,lastName,email,company",
        delay: "1200",
      });
      return `${USERS_API_URL}/users/search?${params.toString()}`;
    }
    case "empty":
      return `${USERS_API_URL}/users/search?q=__phase6_no_user__&delay=1200`;
    case "http-error":
      return `${USERS_API_URL}/http/500/Phase_6_error?delay=1200`;
    case "network-error":
      return "https://phase6-network-error.invalid/users";
    case "invalid-data":
      return `${USERS_API_URL}/http/200/Invalid_users_response?delay=1200`;
  }
}

function isApiUser(value: unknown): value is ApiUser {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;
  if (!isValidCompany(user.company)) {
    return false;
  }
  return (
    typeof user.id === "number" &&
    typeof user.firstName === "string" &&
    typeof user.lastName === "string" &&
    typeof user.email === "string"
  );
}

function isValidCompany(value: unknown) {
  if (value === undefined) return true;

  if (typeof value !== "object" || value === null || Array.isArray(value))
    return false;

  const company = value as Record<string, unknown>;
  return (
    company.department === undefined ||
    company.department === null ||
    typeof company.department === "string"
  );
}

function isUsersResponse(value: unknown): value is UsersResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const response = value as Record<string, unknown>;
  return Array.isArray(response.users) && response.users.every(isApiUser);
}

export async function fetchUsers(
  scenario: RequestScenario,
  keyword = "",
  signal?: AbortSignal,
): Promise<User[]> {
  const response = await fetch(getRequestUrl(scenario, keyword), { signal });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const data: unknown = await response.json();

  if (!isUsersResponse(data)) {
    throw new Error("사용자 응답 형식이 올바르지 않습니다.");
  }

  return data.users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    email: user.email,
    department: user.company?.department ?? null,
  }));
}
