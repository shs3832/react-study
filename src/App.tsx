import { useState } from "react";
import "./App.css";
import ArrayStateExample from "./examples/ArrayStateExample";
import ImmerComparisonExample from "./examples/ImmerComparisonExample";
import KeyIdentityExample from "./examples/KeyIdentityExample";
import ObjectStateExample from "./examples/ObjectStateExample";
import ReducerExample from "./examples/ReducerExample";
import RenderStateExample from "./examples/RenderStateExample";
import TaskReducerExample from "./examples/TaskReducerExample";
import VariableStateRefExample from "./examples/VariableStateRefExample";

type ExampleName =
  | "render"
  | "ref"
  | "object"
  | "array"
  | "key"
  | "reducer"
  | "taskReducer"
  | "immer";

const examples: Array<{ id: ExampleName; label: string }> = [
  { id: "render", label: "렌더링과 state" },
  { id: "ref", label: "일반 변수와 ref" },
  { id: "object", label: "객체 state" },
  { id: "array", label: "배열 state" },
  { id: "key", label: "목록 key 비교" },
  { id: "reducer", label: "useReducer" },
  { id: "taskReducer", label: "할 일 reducer" },
  { id: "immer", label: "Immer 비교" },
];

function App() {
  const [selectedExample, setSelectedExample] =
    useState<ExampleName>("immer");

  function renderExample() {
    switch (selectedExample) {
      case "render":
        return <RenderStateExample />;
      case "ref":
        return <VariableStateRefExample />;
      case "array":
        return <ArrayStateExample />;
      case "key":
        return <KeyIdentityExample />;
      case "reducer":
        return <ReducerExample />;
      case "taskReducer":
        return <TaskReducerExample />;
      case "immer":
        return <ImmerComparisonExample />;
      case "object":
        return <ObjectStateExample />;
    }
  }

  return (
    <main className="study-app">
      <header className="study-header">
        <p className="eyebrow">React 19 fundamentals</p>
        <h1>React 기본기 실습</h1>
        <p>개념별 예제를 선택해 실행 결과를 확인합니다.</p>
      </header>

      <nav className="example-tabs" aria-label="React 학습 예제">
        {examples.map((example) => (
          <button
            key={example.id}
            type="button"
            className={selectedExample === example.id ? "is-active" : ""}
            aria-pressed={selectedExample === example.id}
            onClick={() => setSelectedExample(example.id)}
          >
            {example.label}
          </button>
        ))}
      </nav>

      <section className="example-panel">{renderExample()}</section>
    </main>
  );
}

export default App;
