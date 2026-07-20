import { useActionState } from "react";
import { useFormStatus } from "react-dom";

type FormState = {
  status: "idle" | "success" | "field-error" | "page-error";
  message: string;
  fieldErrors: {
    name?: string;
  };
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "제출 중..." : "제출"}
    </button>
  );
}

export default function N16Phase7CFormActionExample() {
  const initialState: FormState = {
    status: "idle",
    message: "",
    fieldErrors: {},
  };
  async function submitAction(
    _previousState: FormState,
    formData: FormData,
  ): Promise<FormState> {
    const name = formData.get("name");
    if (typeof name !== "string") {
      return {
        status: "page-error",
        message: "이름 데이터를 확인할 수 없습니다.",
        fieldErrors: {},
      };
    }

    const result = name.trim();
    if (result === "") {
      return {
        status: "field-error",
        message: "입력 내용을 확인해 주세요.",
        fieldErrors: {
          name: "이름을 입력해 주세요.",
        },
      };
    }

    await wait(2000);

    if (result === "server-error") {
      return {
        status: "page-error",
        message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
        fieldErrors: {},
      };
    }

    console.log(result);

    return {
      status: "success",
      message: "전송 완료",
      fieldErrors: {},
    };
  }

  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const [state, formAction] = useActionState(submitAction, initialState);
  const nameError = state.fieldErrors.name;

  return (
    <section>
      <h2>React 19 Form Action</h2>

      <form action={formAction}>
        <div>
          <label htmlFor="form-action-name">이름</label>
          <input
            id="form-action-name"
            name="name"
            type="text"
            placeholder="이름을 입력하세요"
            aria-invalid={Boolean(nameError)}
            aria-describedby={nameError ? "form-action-name-error" : undefined}
          />
          {nameError && (
            <p id="form-action-name-error" role="alert">
              {nameError}
            </p>
          )}
        </div>

        <SubmitButton />

        {state.status === "success" && <p role="status">{state.message}</p>}
        {state.status === "page-error" && <p role="alert">{state.message}</p>}
      </form>
    </section>
  );
}
