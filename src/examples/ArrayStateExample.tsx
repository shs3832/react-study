import { useRef, useState } from "react";

function ArrayStateExample() {
  const [tasks, setTasks] = useState([{ id: 1, title: "Check orders" }]);
  const [renderCount, setRenderCount] = useState(0);
  const nextTaskIdRef = useRef(2);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">04. Array state</p>
        <h2>배열 state와 immutable update</h2>
        <p>새 배열을 만들어 항목을 추가, 변경, 삭제합니다.</p>
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
      <div className="button-group">
        <button
          type="button"
          onClick={() => {
            const newTask = {
              id: nextTaskIdRef.current,
              title: "Review users",
            };

            nextTaskIdRef.current += 1;

            const nextTasks = [
              ...tasks,
              newTask,
            ];

            console.log("same array:", Object.is(tasks, nextTasks));

            setTasks(nextTasks);

            console.log("current snapshot length:", tasks.length);
          }}
        >
          Add task safely
        </button>
        <button
          type="button"
          onClick={() => setRenderCount((previousCount) => previousCount + 1)}
        >
          Re-render count is {renderCount}
        </button>
        <button
          type="button"
          onClick={() => {
            const nextTasks = tasks.map((task) => {
              if (task.id === 1) {
                return {
                  ...task,
                  title: "Completed",
                };
              }

              return task;
            });

            console.log("same array:", Object.is(tasks, nextTasks));
            console.log(
              "same changed task:",
              Object.is(tasks[0], nextTasks[0]),
            );
            console.log(
              "same unchanged task:",
              Object.is(tasks[1], nextTasks[1]),
            );

            setTasks(nextTasks);
          }}
        >
          Complete first task
        </button>
        <button
          type="button"
          onClick={() => {
            const nextTasks = tasks.filter((task) => {
              return task.id !== 1;
            });

            console.log("same array:", Object.is(tasks, nextTasks));
            console.log(
              "same remaining task:",
              Object.is(tasks[1], nextTasks[0]),
            );

            setTasks(nextTasks);
          }}
        >
          Delete first task
        </button>
      </div>
    </div>
  );
}

export default ArrayStateExample;
