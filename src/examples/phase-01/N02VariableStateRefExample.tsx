import { useRef, useState } from "react";

function N02VariableStateRefExample() {
  console.log("VariableStateRefExample 함수 실행");

  const [renderCount, setRenderCount] = useState(0);
  const clickCountRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">02. Variable, state, ref</p>
        <h2>일반 변수, state, ref</h2>
        <p>값의 보존과 재렌더링 요청 여부를 비교합니다.</p>
      </div>

      <div className="result-list">
        <p>Ref count는 버튼 클릭 후 콘솔에서 확인합니다.</p>
        <p>Re-render count is {renderCount}</p>
      </div>

      <div className="button-group">
        <button
          type="button"
          onClick={() => {
            clickCountRef.current += 1;
            console.log("ref:", clickCountRef.current);
          }}
        >
          ref 값 증가
        </button>
        <button
          type="button"
          onClick={() =>
            setRenderCount((previousCount) => previousCount + 1)
          }
        >
          state로 재렌더링
        </button>
      </div>

      <div className="focus-example">
        <label htmlFor="focus-target">Focus target</label>
        <input id="focus-target" ref={inputRef} type="text" />
        <button
          type="button"
          onClick={() => {
            console.log(inputRef.current);
            inputRef.current?.focus();
          }}
        >
          input으로 focus 이동
        </button>
      </div>
    </div>
  );
}

export default N02VariableStateRefExample;
