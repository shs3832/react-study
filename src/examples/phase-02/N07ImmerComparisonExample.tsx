import { produce } from "immer";
import { useReducer } from "react";
import StudyCard from "../../components/StudyCard";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskAction =
  | { type: "toggle"; id: number }
  | { type: "reset" };

const initialTasks: Task[] = [
  { id: 1, title: "주문 확인", completed: false },
  { id: 2, title: "상품 검토", completed: false },
];

function directTaskReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case "toggle":
      return tasks.map((task) => {
        if (task.id === action.id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      });
    case "reset":
      return initialTasks;
    default:
      return tasks;
  }
}

function immerTaskReducer(tasks: Task[], action: TaskAction) {
  return produce(tasks, (draft) => {
    switch (action.type) {
      case "toggle": {
        const targetTask = draft.find((task) => task.id === action.id);

        if (targetTask) {
          targetTask.completed = !targetTask.completed;
        }
        break;
      }
      case "reset":
        return initialTasks;
    }
  });
}

function N07ImmerComparisonExample() {
  const [directTasks, directDispatch] = useReducer(
    directTaskReducer,
    initialTasks,
  );
  const [immerTasks, immerDispatch] = useReducer(
    immerTaskReducer,
    initialTasks,
  );

  function toggleTask(id: number) {
    directDispatch({ type: "toggle", id });
    immerDispatch({ type: "toggle", id });
  }

  function resetTasks() {
    directDispatch({ type: "reset" });
    immerDispatch({ type: "reset" });
  }

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">08. Immer comparison</p>
        <h2>직접 불변 업데이트와 Immer 비교</h2>
        <p>
          같은 action으로 같은 결과를 만들고, reducer의 구현 방식만
          비교합니다.
        </p>
      </div>

      <div className="button-group">
        {initialTasks.map((task) => (
          <button
            key={task.id}
            type="button"
            onClick={() => toggleTask(task.id)}
          >
            {task.title} 완료 전환
          </button>
        ))}
        <button type="button" onClick={resetTasks}>
          전체 초기화
        </button>
      </div>

      <div className="key-demo-grid">
        <StudyCard title="직접 불변 업데이트" actions={<code>map + spread</code>}>
          <ul>
            {directTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                <span>{task.completed ? "완료" : "진행 중"}</span>
              </li>
            ))}
          </ul>
        </StudyCard>

        <StudyCard title="Immer" actions={<code>produce + draft</code>}>
          <ul>
            {immerTasks.map((task) => (
              <li key={task.id}>
                <strong>{task.title}</strong>
                <span>{task.completed ? "완료" : "진행 중"}</span>
              </li>
            ))}
          </ul>
        </StudyCard>
      </div>
    </div>
  );
}

export default N07ImmerComparisonExample;
