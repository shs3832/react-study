import { startTransition, useOptimistic, useState } from "react";
import { useFormStatus } from "react-dom";

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "수정 중..." : "이름 수정"}
    </button>
  );
}

export default function N16Phase7COptimisticNameExample() {
  const [confirmedName, setConfirmedName] = useState("Lee");
  const [optimisticName, setOptimisticName] = useOptimistic(confirmedName);

  async function updateNameAction(formData: FormData) {
    const nameValue = formData.get("name");

    if (typeof nameValue !== "string" || nameValue.trim() === "") {
      return;
    }

    const nextName = nameValue.trim();

    setOptimisticName(nextName);
    await wait(2000);

    startTransition(() => {
      setConfirmedName(nextName);
    });
  }

  return (
    <section>
      <h2>useOptimistic 이름 변경</h2>

      <p>
        화면 표시 이름: {optimisticName}
        {optimisticName !== confirmedName && " (저장 중...)"}
      </p>
      <p>확정된 이름: {confirmedName}</p>

      <form action={updateNameAction}>
        <div>
          <label htmlFor="optimistic-name">새 이름</label>
          <input
            id="optimistic-name"
            name="name"
            type="text"
            placeholder="변경할 이름을 입력하세요"
            required
          />
        </div>

        <SubmitButton />
      </form>
    </section>
  );
}
