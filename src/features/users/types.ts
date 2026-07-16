export type RequestScenario =
  | "success"
  | "empty"
  | "http-error"
  | "network-error"
  | "invalid-data";

export type User = {
  id: number;
  name: string;
  email: string;
  department: string | null;
};

export type UsersState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "empty" }
  | { status: "success"; users: User[] };
