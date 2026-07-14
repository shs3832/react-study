import { useReducer, useRef, useState } from "react";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type TaskAction =
  | { type: "add"; task: Task }
  | { type: "toggle"; id: number }
  | { type: "delete"; id: number }
  | { type: "reset" };

const initialTasks: Task[] = [
  { id: 1, title: "주문 확인", completed: false },
  { id: 2, title: "상품 검토", completed: false },
];

function taskReducer(tasks: Task[], action: TaskAction) {
  switch (action.type) {
    case "add":
      return [...tasks, action.task];
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
    case "delete":
      return tasks.filter((task) => {
        return task.id !== action.id;
      });
    case "reset":
      return initialTasks;
    default:
      return tasks;
  }
}

function TaskReducerExample() {
  const nextTaskIdRef = useRef(3);
  const [draftTitle, setDraftTitle] = useState("");
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks);

  const handleAddTask = () => {
    const title = draftTitle.trim();
    if (!title) return;
    dispatch({
      type: "add",
      task: {
        id: nextTaskIdRef.current,
        title,
        completed: false,
      },
    });

    nextTaskIdRef.current += 1;
    setDraftTitle("");
  };

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">07. Task reducer</p>
        <h2>할 일 목록의 변경 규칙 모으기</h2>
        <p>
          컴포넌트는 action만 전달하고, reducer가 add, toggle, delete,
          reset 규칙으로 다음 할 일 목록을 계산합니다.
        </p>
      </div>

      <div className="focus-example">
        <label htmlFor="task-title">새 할 일</label>
        <input
          id="task-title"
          value={draftTitle}
          onChange={(event) => setDraftTitle(event.target.value)}
        />
        <button type="button" onClick={handleAddTask}>
          할 일 추가
        </button>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.completed ? "완료" : "진행 중"}
            <button
              type="button"
              onClick={() => dispatch({ type: "toggle", id: task.id })}
            >
              완료 상태 전환
            </button>
            <button
              type="button"
              onClick={() => dispatch({ type: "delete", id: task.id })}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => dispatch({ type: "reset" })}>
        전체 초기화
      </button>
    </div>
  );
}

export default TaskReducerExample;
