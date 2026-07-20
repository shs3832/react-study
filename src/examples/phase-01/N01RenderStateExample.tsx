import { useState } from "react";

function N01RenderStateExample() {
  console.log("RenderStateExample 함수 실행");

  const [count, setCount] = useState(0);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">01. Render and state</p>
        <h2>렌더링, snapshot, batching</h2>
        <p>현재 render의 state와 updater function의 차이를 확인합니다.</p>
      </div>

      <p className="result">Count is {count}</p>

      <div className="button-group">
        <button
          type="button"
          onClick={() => {
            setCount(count + 1);
            setCount(count + 1);
            setCount(count + 1);
          }}
        >
          같은 snapshot으로 3번 요청
        </button>
        <button
          type="button"
          onClick={() => {
            setCount((previousCount) => previousCount + 1);
            setCount((previousCount) => previousCount + 1);
            setCount((previousCount) => previousCount + 1);
          }}
        >
          updater로 3번 요청
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default N01RenderStateExample;
