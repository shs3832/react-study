import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";

export default function N14Phase7AFormBasicsExample() {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const memoRef = useRef<HTMLInputElement>(null);
  const handleSetName = (event: ChangeEvent<HTMLInputElement>) => {
    const nextName = event.currentTarget.value;
    setName(nextName);
    if (hasSubmitted) {
      setNameError(nextName.trim() === "" ? "이름을 입력해 주세요" : "");
    }
  };
  const handleMemo = () => {
    console.log(memoRef.current?.value);
  };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setNameError("");
    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData);
    const displayName = formData.get("name")?.toString().trim();
    const memoValue = formData.get("memo")?.toString().trim() ?? "";

    if (!displayName) {
      setNameError("이름을 입력해 주세요");
      nameRef.current?.focus();
      return;
    }

    const note = memoValue === "" ? null : memoValue;
    const payload = {
      displayName,
      note,
    };
    console.log(payload, formValues);
  };

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Phase 7-A. Form basics</p>
        <h2>Form 기본 원리</h2>
        <p>
          controlled input의 값이 React state와 화면에 어떻게 연결되는지
          확인해보세요.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">이름</label>
          <input
            type="text"
            placeholder="이름을 입력해주세요"
            id="name"
            name="name"
            value={name}
            onChange={handleSetName}
            aria-invalid={nameError.length === 0 ? undefined : true}
            aria-describedby={nameError ? "name-error-message" : undefined}
            ref={nameRef}
          />
          {nameError && <p id="name-error-message">{nameError}</p>}
          <p>현재 입력값: {name || "없음"}</p>
        </div>
        <div>
          <label htmlFor="memo">메모</label>
          <input type="text" name="memo" id="memo" ref={memoRef} />
          <button type="button" onClick={handleMemo}>
            메모 값 확인
          </button>
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
