import { memo, useCallback, useState } from "react";
import StudyCard from "../components/StudyCard";

type Category = "전체" | "문구" | "전자";

type ActionButtonProps = {
  label: string;
  onAction: () => void;
};

const MemoizedActionButton = memo(function MemoizedActionButton({
  label,
  onAction,
}: ActionButtonProps) {
  console.log(`MemoizedActionButton 함수 실행: ${label}`);

  return (
    <button type="button" onClick={onAction}>
      {label}
    </button>
  );
});

function UseCallbackExample() {
  const [parentCount, setParentCount] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("전체");

  console.log("UseCallbackExample 함수 실행");

  const handleRegularAction = () => {
    console.log("일반 함수 prop 실행");
  };

  const handleStableAction = useCallback(() => {
    console.log(`useCallback 함수 prop 실행: ${selectedCategory}`);
  }, [selectedCategory]);

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">13. React useCallback</p>
        <h2>함수 prop의 참조 유지</h2>
        <p>
          부모가 재렌더링될 때 일반 함수와 useCallback 함수가 memo 자식에
          미치는 차이를 비교합니다.
        </p>
      </div>

      <p className="result">부모 count: {parentCount}</p>

      <div className="button-group">
        <button
          type="button"
          onClick={() => setParentCount((count) => count + 1)}
        >
          부모 count 증가
        </button>
      </div>

      <div className="focus-example">
        <label htmlFor="callback-category">선택 카테고리</label>
        <select
          id="callback-category"
          value={selectedCategory}
          onChange={(event) =>
            setSelectedCategory(event.target.value as Category)
          }
        >
          <option value="전체">전체</option>
          <option value="문구">문구</option>
          <option value="전자">전자</option>
        </select>
      </div>

      <div className="key-demo-grid">
        <StudyCard title="일반 함수 prop" actions={<code>새 함수</code>}>
          <MemoizedActionButton
            label="일반 함수 실행"
            onAction={handleRegularAction}
          />
        </StudyCard>

        <StudyCard title="useCallback 함수 prop" actions={<code>참조 유지</code>}>
          <MemoizedActionButton
            label="useCallback 함수 실행"
            onAction={handleStableAction}
          />
        </StudyCard>
      </div>

      <p>
        현재 버튼은 가벼워 실제 최적화가 필요하지 않으며, 함수 참조와
        memo의 관계를 확인하기 위한 예제입니다.
      </p>
    </div>
  );
}

export default UseCallbackExample;
