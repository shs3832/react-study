import { useState } from "react";

const initialTasks = [
  { id: 1, title: "Check orders" },
  { id: 2, title: "Review users" },
];

type KeyMode = "index" | "id";

interface TaskListDemoProps {
  keyMode: KeyMode;
}

function TaskListDemo({ keyMode }: TaskListDemoProps) {
  const [tasks, setTasks] = useState(initialTasks);

  function deleteFirstTask() {
    setTasks((previousTasks) => previousTasks.slice(1));
  }

  return (
    <section className="key-demo-card">
      <h4>{keyMode === "index" ? "Index key" : "Stable ID key"}</h4>
      <ul>
        {tasks.map((task, index) => (
          <li key={keyMode === "index" ? index : task.id}>
            <span>{task.title}</span>
            <label>
              <span className="visually-hidden">{task.title} memo</span>
              <input type="text" placeholder="행 메모 입력" />
            </label>
          </li>
        ))}
      </ul>
      <button type="button" onClick={deleteFirstTask}>
        첫 항목 삭제
      </button>
    </section>
  );
}

function KeyIdentityExample() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <section className="key-identity-example">
      <div className="key-demo-header">
        <div>
          <p className="eyebrow">Key identity comparison</p>
          <h3>Index key와 ID key 비교</h3>
          <p>각 목록의 두 input에 서로 다른 메모를 입력한 뒤 첫 항목을 삭제합니다.</p>
        </div>
        <button
          type="button"
          onClick={() => setResetKey((previousKey) => previousKey + 1)}
        >
          비교 실습 Reset
        </button>
      </div>

      <div key={resetKey} className="key-demo-grid">
        <TaskListDemo keyMode="index" />
        <TaskListDemo keyMode="id" />
      </div>
    </section>
  );
}

export default KeyIdentityExample;
