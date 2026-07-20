# React 기본기 학습

React API를 빠르게 훑는 대신 렌더링, 상태, Effect, 재사용, Router의 동작 원리를 작은 실행 예제로 확인하는 학습 저장소입니다.

## 학습 기준

- React 19.2.7
- React DOM 19.2.7
- React Router 7.18.1
- TypeScript
- Vite
- StrictMode 활성화
- React Compiler 비활성화

개념 설명 후 실행 결과를 예측하고, 브라우저·콘솔·React DevTools에서 확인합니다. 기능을 외우는 것보다 state와 책임을 어디에 둘지 설명할 수 있는 상태를 목표로 합니다.

## 실행

```bash
npm install
npm run dev
```

기본 개발 서버는 `http://localhost:3000`에서 실행됩니다.

검증 명령:

```bash
npm test -- --run
npm run lint
npm run build
```

## 학습 예제

`src/examples/phase-01/`부터 `phase-07/`까지 커리큘럼 Phase별 실행 예제를 둡니다.
파일명의 `N01`~`N17`은 Notion의 `React 기본기 01`~`React 기본기 17` 기록 번호이며,
Phase 7 파일은 `N14Phase7A...`처럼 하위 Phase도 함께 표시합니다.

Notion 04(Props와 컴포넌트 책임), 05(파생값과 State 모델링)는 여러 예제에서 반복해 확인한
개념 기록이므로 현재 별도의 단일 실행 파일은 없습니다.

- 렌더링과 state snapshot
- 일반 변수, state, ref
- 객체·배열 state와 불변 업데이트
- 목록 key와 컴포넌트 identity
- `useReducer`와 Immer
- Context Provider 범위
- event handler와 Effect
- custom Hook과 cleanup
- `memo`, `useMemo`, `useCallback`
- Router와 URL State
- 직접 fetch와 TanStack Query
- Form 기본 원리
- React Hook Form과 Zod
- React 19 Form Action과 optimistic UI
- 사용자 행동 중심 테스트와 MSW

## Router와 URL State

`phase-05/N10NavLinkExample.tsx`에서 다음 흐름을 확인합니다.

- layout, index, nested, dynamic, wildcard route
- `Link`, `NavLink`, `useNavigate`
- `NavLink`의 `end`와 pathname 매칭
- query와 hash가 활성 상태에 미치는 영향
- 절대 경로와 상대 경로
- `to=".."`와 `navigate(-1)`
- push와 replace의 방문 기록 차이
- 공통 layout을 유지하는 404 화면

Router 코드는 다음 순서로 읽습니다.

```text
route 설정
→ 현재 URL
→ 매칭되는 route branch
→ 각 Outlet에 렌더링되는 컴포넌트
```

## Form 기본 원리

`phase-07/N14Phase7AFormBasicsExample.tsx`에서 다음 흐름을 확인합니다.

- controlled input과 uncontrolled input의 값 소유자
- `label`, `id`, `name`, `FormData`의 역할
- form value와 API payload의 분리 및 변환
- submit 기본 동작 차단과 제출 시점 validation
- `aria-invalid`, `aria-describedby`, 오류 메시지 연결
- 제출 실패 시 첫 번째 오류 input으로 포커스 이동
- 클라이언트 오류, 서버 field error, form 전체 오류의 책임 구분

`scripts/function-return-example.mjs`에서는 이벤트 핸들러 학습 중 확인한 함수 참조, 함수 호출, 함수를 반환하는 함수의 차이를 콘솔에서 실행해봅니다.

## React Hook Form과 Zod

`phase-07/N15Phase7BReactHookFormExample.tsx`에서 Phase 7-A의 직접 state 관리 방식과 다음 책임 차이를 비교합니다.

- `register`, `handleSubmit`, `defaultValues`, `formState`의 역할
- Zod schema와 `zodResolver`를 통한 클라이언트 validation
- `z.infer`로 schema에서 form value 타입 추론
- `isSubmitting`과 submit 버튼 비활성화를 통한 중복 요청 방지
- `setError`를 사용한 서버 field error와 form 전체 page error 분리
- `aria-invalid`, `aria-describedby`, 오류 focus와 `role="alert"`
- trim된 form value를 API의 `displayName` payload로 변환

서버 오류는 실제 API 요청 대신 `duplicate`와 `server-error` 입력으로 모의 검증합니다.

## React 19 Form Action

`phase-07/N16Phase7CFormActionExample.tsx`에서 React 18의 submit handler 방식과 비교하며 다음 흐름을 확인합니다.

- `<form action={...}>`과 submit 시점의 `FormData` 전달
- 비동기 Action의 Promise와 `useFormStatus().pending`
- `useActionState`의 이전 state, Action dispatcher, 결과 state 연결
- success, field error, form 전체 page error 반환
- `aria-invalid`, `aria-describedby`, `role="alert"` 연결
- Action 성공 후 uncontrolled input 자동 초기화

`phase-07/N16Phase7COptimisticNameExample.tsx`에서는 확정된 이름과 임시 화면값을 분리해 다음 흐름을 비교합니다.

- `useState`의 확정값과 `useOptimistic`의 임시값
- 서버 응답을 기다리는 동안 예상 결과를 먼저 표시
- `await` 이후 확정 state 반영과 `startTransition`
- `useFormStatus`의 실제 pending과 두 이름의 값 비교 차이

두 예제의 비동기 처리는 실제 API가 아닌 2초 지연으로 모의합니다. optimistic 성공 흐름은 브라우저에서 검증했고, 실패 rollback은 확정값을 갱신하지 않으면 기준값으로 복귀하는 개념 범위로 확인했습니다.

## 사용자 행동 중심 테스트

`N17Phase7D...test.tsx` 파일에서 Vitest와 Testing Library를 사용해 다음 흐름을 검증합니다.

- `render`, `screen`, `userEvent`, jest-dom matcher의 책임
- 현재 존재하는 요소의 `getBy`, 나중에 나타나는 요소의 `findBy`, 부재 확인의 `queryBy`
- Form 기본 예제의 입력, validation, 오류 해제, ARIA 연결과 focus
- Form Action의 pending, success, field error, page error와 uncontrolled input 초기화
- MSW가 실제 `fetch` 요청을 가로채 성공 JSON과 HTTP 500 응답을 제공하는 흐름
- DOM `cleanup`과 테스트별 MSW handler `resetHandlers`

테스트는 내부 state나 함수 호출보다 사용자가 수행하는 행동과 화면에서 관찰할 수 있는 결과를 우선합니다. AI가 테스트 초안을 만들 수 있지만, 사용자 시나리오와 assertion의 의미·위치는 개발자가 검토합니다.

## 현재 진행 상태

- Phase 1~4: React 렌더링, 상태 모델링, Context·Effect, 최적화와 재사용 완료
- Phase 5: Router와 URL State 완료
- Phase 6-A: 직접 fetch와 loading/error/empty/success 완료
- Phase 6-B: AbortController, 오래된 응답 차단, debounce 완료
- Phase 6-C: 직접 fetch와 TanStack Query의 서버 상태 관리 책임 비교 완료
- Phase 7-A: Form 기본 원리 완료
- Phase 7-B: React Hook Form과 Zod 완료
- Phase 7-C: React 19 Form과 Action 완료
- Phase 7-D: 사용자 행동 중심 테스트 완료
- React 기본기 스터디 완료 — 다음 학습은 별도 Next.js 계획으로 진행

상세 학습 기록과 회고는 별도 학습 계획 문서와 Notion의 `React 기본기 학습` 페이지에서 관리합니다.
