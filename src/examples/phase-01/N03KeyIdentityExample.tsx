import { useState } from "react";
import StudyCard from "../../components/StudyCard";

interface Task {
  id: number;
  title: string;
}
function createInitialTasks(): Task[] {
  return [
    { id: 1, title: "Check orders" },
    { id: 2, title: "Review users" },
  ];
}

type KeyMode = "index" | "id";

interface TaskListDemoProps {
  keyMode: KeyMode;
  tasks: Task[];
  onDelete: (taskId: number) => void;
}

function TaskListDemo({ keyMode, tasks, onDelete }: TaskListDemoProps) {
  console.log("TaskListDemo render:", keyMode);
  return (
    <StudyCard
      title={keyMode === "index" ? "Index key" : "Stable ID key"}
      actions={<span>{tasks.length}개</span>}
    >
      <ul>
        {tasks.map((task, index) => (
          <li key={keyMode === "index" ? index : task.id}>
            <span>{task.title}</span>
            <label>
              <span className="visually-hidden">{task.title} memo</span>
              <input type="text" placeholder="행 메모 입력" />
            </label>
            <button type="button" onClick={() => onDelete(task.id)}>
              {task.title} 삭제
            </button>
          </li>
        ))}
      </ul>
    </StudyCard>
  );
}

function N03KeyIdentityExample() {
  console.log("KeyIdentityExample render");
  const [resetKey, setResetKey] = useState(0);
  const [indexTasks, setIndexTasks] = useState(createInitialTasks);
  const [idTasks, setIdTasks] = useState(createInitialTasks);

  const totalTaskCount = indexTasks.length + idTasks.length;
  return (
    <section className="key-identity-example">
      <div className="key-demo-header">
        <div>
          <p className="eyebrow">Key identity comparison</p>
          <h3>Index key와 ID key 비교</h3>
          <p>
            각 목록의 두 input에 서로 다른 메모를 입력한 뒤 첫 항목을
            삭제합니다.
          </p>
          <p>두 목록에 남은 task 수: {totalTaskCount}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setIndexTasks(createInitialTasks());
            setIdTasks(createInitialTasks());
            setResetKey((previousKey) => previousKey + 1);
          }}
        >
          비교 실습 Reset
        </button>
      </div>

      <div key={resetKey} className="key-demo-grid">
        <TaskListDemo
          keyMode="index"
          tasks={indexTasks}
          onDelete={(taskId) => {
            setIndexTasks((previousTasks) =>
              previousTasks.filter((task) => task.id !== taskId),
            );
          }}
        />
        <TaskListDemo
          keyMode="id"
          tasks={idTasks}
          onDelete={(taskId) => {
            setIdTasks((previousTasks) =>
              previousTasks.filter((task) => task.id !== taskId),
            );
          }}
        />
      </div>
    </section>
  );
}

export default N03KeyIdentityExample;
