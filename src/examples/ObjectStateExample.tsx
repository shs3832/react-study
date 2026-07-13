import { useState } from "react";

function ObjectStateExample() {
  console.log("ObjectStateExample 함수 실행");

  const [user, setUser] = useState({
    name: "Kim",
    address: {
      city: "Seoul",
    },
  });

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">03. Object state</p>
        <h2>객체 state와 immutable update</h2>
        <p>기존 객체를 보존하고 변경 경로에 새 객체를 만듭니다.</p>
      </div>

      <div className="result-list">
        <p>User name is {user.name}</p>
        <p>City is {user.address.city}</p>
      </div>

      <div className="button-group">
        <button
          type="button"
          onClick={() => {
            const nextUser = {
              ...user,
              name: "Lee",
            };

            console.log("same object:", Object.is(user, nextUser));
            setUser(nextUser);
            console.log("current snapshot:", user.name);
          }}
        >
          이름 안전하게 변경
        </button>
        <button
          type="button"
          onClick={() => {
            const nextUser = {
              ...user,
              address: {
                ...user.address,
                city: "Busan",
              },
            };

            console.log("same user:", Object.is(user, nextUser));
            console.log(
              "same address:",
              Object.is(user.address, nextUser.address),
            );
            setUser(nextUser);
          }}
        >
          도시 안전하게 변경
        </button>
        <button
          type="button"
          onClick={() =>
            setUser({ name: "Kim", address: { city: "Seoul" } })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default ObjectStateExample;
