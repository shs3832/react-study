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
npm run lint
npm run build
```

## 학습 예제

`src/examples/`에 개념별 실행 예제를 둡니다.

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

## Router와 URL State

`NavLinkExample.tsx`에서 다음 흐름을 확인합니다.

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

## 현재 진행 상태

- Phase 1~4: React 렌더링, 상태 모델링, Context·Effect, 최적화와 재사용 완료
- Phase 5: Router와 URL State 완료
- Phase 6-A: 직접 fetch와 loading/error/empty/success 완료
- 다음 학습: Phase 6-B — AbortController, 오래된 응답 차단, debounce

상세 학습 기록과 회고는 별도 학습 계획 문서와 Notion의 `React 기본기 학습` 페이지에서 관리합니다.
