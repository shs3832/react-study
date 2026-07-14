import { useReducer } from "react";

type CounterAction =
  | { type: "increase" }
  | { type: "increaseBy"; amount: number }
  | { type: "decrease" }
  | { type: "reset" };

function counterReducer(currentCount: number, action: CounterAction) {
  switch (action.type) {
    case "increase":
      return currentCount + 1;
    case "increaseBy":
      return currentCount + action.amount;
    case "decrease":
      return currentCount - 1;
    case "reset":
      return 0;
    default:
      return currentCount;
  }
}

function ReducerExample() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">06. useReducer</p>
        <h2>상태 변경 규칙을 한곳에 모으기</h2>
        <p>
          버튼은 어떤 사건이 발생했는지 전달하고, reducer가 다음 state를
          계산합니다.
        </p>
      </div>

      <p className="result">현재 count: {count}</p>

      <div className="button-group">
        <button type="button" onClick={() => dispatch({ type: "increase" })}>
          dispatch: increase
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "increaseBy", amount: 3 })}
        >
          dispatch: increase by 3
        </button>
        <button type="button" onClick={() => dispatch({ type: "decrease" })}>
          dispatch: decrease
        </button>
        <button type="button" onClick={() => dispatch({ type: "reset" })}>
          dispatch: reset
        </button>
      </div>

      <ol className="result-list">
        <li>버튼을 누르면 dispatch가 action을 전달합니다.</li>
        <li>counterReducer가 현재 count와 action을 받습니다.</li>
        <li>counterReducer가 반환한 값이 다음 count가 됩니다.</li>
      </ol>
    </div>
  );
}

export default ReducerExample;
