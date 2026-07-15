import { memo, useState } from "react";
import StudyCard from "../components/StudyCard";

type GreetingProps = {
  name: string;
};

function RegularGreeting({ name }: GreetingProps) {
  console.log("RegularGreeting 함수 실행");

  return <p className="result">안녕하세요, {name}님.</p>;
}

const MemoizedGreeting = memo(function MemoizedGreeting({
  name,
}: GreetingProps) {
  console.log("MemoizedGreeting 함수 실행");

  return <p className="result">안녕하세요, {name}님.</p>;
});

function MemoExample() {
  const [parentCount, setParentCount] = useState(0);
  const [name, setName] = useState("민수");

  console.log("MemoExample 함수 실행");

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">11. React memo</p>
        <h2>같은 props와 자식 재렌더링</h2>
        <p>
          부모 state만 변경했을 때 일반 자식과 memo 자식의 함수 실행을
          비교합니다.
        </p>
      </div>

      <p className="result">부모 count: {parentCount}</p>

      <div className="focus-example">
        <label htmlFor="memo-name">자식에게 전달할 이름</label>
        <input
          id="memo-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="button-group">
        <button
          type="button"
          onClick={() => setParentCount((count) => count + 1)}
        >
          부모 count 증가
        </button>
      </div>

      <div className="key-demo-grid">
        <StudyCard title="일반 자식" actions={<code>RegularGreeting</code>}>
          <RegularGreeting name={name} />
        </StudyCard>

        <StudyCard title="memo 자식" actions={<code>MemoizedGreeting</code>}>
          <MemoizedGreeting name={name} />
        </StudyCard>
      </div>
    </div>
  );
}

export default MemoExample;
