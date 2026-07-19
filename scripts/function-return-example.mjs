function handleSetName() {
  console.log("3. handleSetName 실행");
}

function outer() {
  console.log("2. outer 실행");
  return handleSetName;
}

console.log("1. outer 함수를 saved에 저장");
const saved = outer;

console.log("saved === outer:", saved === outer);

console.log("saved() 호출");
const returnedFunction = saved();

console.log(
  "returnedFunction === handleSetName:",
  returnedFunction === handleSetName,
);

console.log("아직 handleSetName은 실행되지 않았습니다.");

// 아래 주석을 해제하면 반환된 handleSetName이 실행됩니다.
// returnedFunction();
