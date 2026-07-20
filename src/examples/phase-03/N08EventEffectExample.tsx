import { useEffect, useState } from "react";

type LogMode = "기본" | "상세";

function useWindowWidth(logMode: LogMode) {
  const [windowWidth, setWindowWidth] = useState(() => window.innerWidth);
  useEffect(() => {
    function handleResize() {
      if (logMode === "상세") {
        console.log(`현재 브라우저 너비: ${window.innerWidth}px`);
      } else {
        console.log("resize handler 실행");
      }
      setWindowWidth(window.innerWidth);
    }

    console.log("resize listener setup");
    window.addEventListener("resize", handleResize);

    return () => {
      console.log("resize listener cleanup");
      window.removeEventListener("resize", handleResize);
    };
  }, [logMode]);
  return windowWidth;
}

function WindowWidthTracker() {
  const [logMode, setLogMode] = useState<LogMode>("기본");
  const windowWidth = useWindowWidth(logMode);
  const handleModeChange = () => {
    setLogMode((prev) => (prev === "기본" ? "상세" : "기본"));
  };

  return (
    <p className="result">
      브라우저 너비: {windowWidth}px{" "}
      <button type="button" onClick={handleModeChange}>
        {logMode}
      </button>
    </p>
  );
}

function N08EventEffectExample() {
  const [message, setMessage] = useState("아직 구매하지 않았습니다.");
  const [lastName, setLastName] = useState("김");
  const [firstName, setFirstName] = useState("민수");
  const [showWidthTracker, setShowWidthTracker] = useState(true);
  const fullName = `${lastName} ${firstName}`;

  useEffect(() => {
    document.title = message;
  }, [message]);

  function handlePurchase() {
    console.log("구매 확정 버튼을 클릭해서 handler가 실행됐습니다.");
    setMessage("구매가 확정되었습니다.");
  }

  function handleReset() {
    console.log("초기화 버튼을 클릭해서 handler가 실행됐습니다.");
    setMessage("아직 구매하지 않았습니다.");
  }

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">10. Event handler and Effect</p>
        <h2>event handler의 실행 원인</h2>
        <p>사용자의 특정 행동 때문에 실행되는 코드를 확인합니다.</p>
      </div>

      <p className="result">{message}</p>

      <div className="button-group">
        <button type="button" onClick={handlePurchase}>
          구매 확정
        </button>
        <button type="button" onClick={handleReset}>
          초기화
        </button>
      </div>

      <div className="focus-example">
        <label htmlFor="last-name">성</label>
        <input
          id="last-name"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>

      <div className="focus-example">
        <label htmlFor="first-name">이름</label>
        <input
          id="first-name"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>

      <p className="result">전체 이름: {fullName}</p>

      <div className="button-group">
        <button
          type="button"
          onClick={() => setShowWidthTracker((isVisible) => !isVisible)}
        >
          {showWidthTracker ? "너비 추적 숨기기" : "너비 추적 보이기"}
        </button>
      </div>

      {showWidthTracker && <WindowWidthTracker />}
    </div>
  );
}

export default N08EventEffectExample;
