import { useState } from "react";
import "./App.css";
import N01RenderStateExample from "./examples/phase-01/N01RenderStateExample";
import N02VariableStateRefExample from "./examples/phase-01/N02VariableStateRefExample";
import N03KeyIdentityExample from "./examples/phase-01/N03KeyIdentityExample";
import N03ArrayStateExample from "./examples/phase-02/N03ArrayStateExample";
import N03ObjectStateExample from "./examples/phase-02/N03ObjectStateExample";
import N06ReducerExample from "./examples/phase-02/N06ReducerExample";
import N06TaskReducerExample from "./examples/phase-02/N06TaskReducerExample";
import N07ImmerComparisonExample from "./examples/phase-02/N07ImmerComparisonExample";
import N08ContextProviderExample from "./examples/phase-03/N08ContextProviderExample";
import N08EventEffectExample from "./examples/phase-03/N08EventEffectExample";
import N09MemoExample from "./examples/phase-04/N09MemoExample";
import N09UseCallbackExample from "./examples/phase-04/N09UseCallbackExample";
import N09UseMemoExample from "./examples/phase-04/N09UseMemoExample";
import N10NavLinkExample from "./examples/phase-05/N10NavLinkExample";
import N11N12UserManagementExample from "./examples/phase-06/N11N12UserManagementExample";
import N13UserManagementQueryExample from "./examples/phase-06/N13UserManagementQueryExample";
import N14Phase7AFormBasicsExample from "./examples/phase-07/N14Phase7AFormBasicsExample";
import N15Phase7BReactHookFormExample from "./examples/phase-07/N15Phase7BReactHookFormExample";
import N16Phase7CFormActionExample from "./examples/phase-07/N16Phase7CFormActionExample";
import N16Phase7COptimisticNameExample from "./examples/phase-07/N16Phase7COptimisticNameExample";

const exampleGroups = [
  {
    phase: "Phase 1 · React 실행 모델",
    examples: [
      {
        id: "render",
        notion: "N01",
        label: "렌더링과 state",
        component: N01RenderStateExample,
      },
      {
        id: "ref",
        notion: "N02",
        label: "일반 변수와 ref",
        component: N02VariableStateRefExample,
      },
      {
        id: "key",
        notion: "N03",
        label: "목록 key 비교",
        component: N03KeyIdentityExample,
      },
    ],
  },
  {
    phase: "Phase 2 · State 모델링",
    examples: [
      {
        id: "object",
        notion: "N03",
        label: "객체 state",
        component: N03ObjectStateExample,
      },
      {
        id: "array",
        notion: "N03",
        label: "배열 state",
        component: N03ArrayStateExample,
      },
      {
        id: "reducer",
        notion: "N06",
        label: "useReducer",
        component: N06ReducerExample,
      },
      {
        id: "taskReducer",
        notion: "N06",
        label: "할 일 reducer",
        component: N06TaskReducerExample,
      },
      {
        id: "immer",
        notion: "N07",
        label: "Immer 비교",
        component: N07ImmerComparisonExample,
      },
    ],
  },
  {
    phase: "Phase 3 · Context, Effect, Ref",
    examples: [
      {
        id: "context",
        notion: "N08",
        label: "Context 범위",
        component: N08ContextProviderExample,
      },
      {
        id: "eventEffect",
        notion: "N08",
        label: "Handler와 Effect",
        component: N08EventEffectExample,
      },
    ],
  },
  {
    phase: "Phase 4 · 최적화와 재사용",
    examples: [
      {
        id: "memo",
        notion: "N09",
        label: "memo 비교",
        component: N09MemoExample,
      },
      {
        id: "useMemo",
        notion: "N09",
        label: "useMemo 계산",
        component: N09UseMemoExample,
      },
      {
        id: "useCallback",
        notion: "N09",
        label: "useCallback 함수",
        component: N09UseCallbackExample,
      },
    ],
  },
  {
    phase: "Phase 5 · Router와 URL State",
    examples: [
      {
        id: "navLink",
        notion: "N10",
        label: "Router와 NavLink",
        component: N10NavLinkExample,
      },
    ],
  },
  {
    phase: "Phase 6 · 비동기 데이터와 Server State",
    examples: [
      {
        id: "serverState",
        notion: "N11·N12",
        label: "사용자 API (직접 fetch)",
        component: N11N12UserManagementExample,
      },
      {
        id: "serverStateQuery",
        notion: "N13",
        label: "사용자 API (TanStack Query)",
        component: N13UserManagementQueryExample,
      },
    ],
  },
  {
    phase: "Phase 7 · Form, React 19, Test",
    examples: [
      {
        id: "formBasics",
        notion: "N14 · 7-A",
        label: "폼 기본 원리",
        component: N14Phase7AFormBasicsExample,
      },
      {
        id: "reactHookForm",
        notion: "N15 · 7-B",
        label: "React Hook Form과 Zod",
        component: N15Phase7BReactHookFormExample,
      },
      {
        id: "formAction",
        notion: "N16 · 7-C",
        label: "React 19 Form Action",
        component: N16Phase7CFormActionExample,
      },
      {
        id: "optimisticName",
        notion: "N16 · 7-C",
        label: "useOptimistic 이름 변경",
        component: N16Phase7COptimisticNameExample,
      },
    ],
  },
] as const;

type ExampleName =
  (typeof exampleGroups)[number]["examples"][number]["id"];

function App() {
  const [selectedExample, setSelectedExample] =
    useState<ExampleName>("navLink");

  const selected = exampleGroups
    .flatMap((group) => [...group.examples])
    .find((example) => example.id === selectedExample);
  const SelectedExample = selected?.component ?? N10NavLinkExample;

  return (
    <main className="study-app">
      <header className="study-header">
        <p className="eyebrow">React 19 fundamentals</p>
        <h1>React 기본기 실습</h1>
        <p>Phase와 Notion 학습 기록 번호별로 예제를 선택합니다.</p>
      </header>

      <nav className="example-groups" aria-label="React 학습 예제">
        {exampleGroups.map((group) => (
          <section className="example-group" key={group.phase}>
            <h2>{group.phase}</h2>
            <div className="example-tabs">
              {group.examples.map((example) => (
                <button
                  key={example.id}
                  type="button"
                  className={selectedExample === example.id ? "is-active" : ""}
                  aria-pressed={selectedExample === example.id}
                  onClick={() => setSelectedExample(example.id)}
                >
                  <span className="example-notion-number">{example.notion}</span>
                  {example.label}
                </button>
              ))}
            </div>
          </section>
        ))}
      </nav>

      <section className="example-panel">
        <SelectedExample />
      </section>
    </main>
  );
}

export default App;
