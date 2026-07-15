import {
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function RouterLayout() {
  const location = useLocation();

  return (
    <div className="router-layout">
      <p className="result">
        현재 URL:{" "}
        <strong>
          {location.pathname}
          {location.search}
          {location.hash}
        </strong>
      </p>

      <nav className="router-menu" aria-label="관리자 메뉴">
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "router-link is-active" : "router-link"
          }
        >
          사용자 관리 (하위 경로 포함)
        </NavLink>
        <NavLink
          to="/users"
          end
          className={({ isActive }) =>
            isActive ? "router-link is-active" : "router-link"
          }
        >
          사용자 목록 (정확히 /users)
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "router-link is-active" : "router-link"
          }
        >
          상품 관리
        </NavLink>
        <NavLink
          to="/navigation-history"
          end
          className={({ isActive }) =>
            isActive ? "router-link is-active" : "router-link"
          }
        >
          이동 기록 실습
        </NavLink>
        <Link className="router-link" to="/missing-page">
          없는 페이지 테스트
        </Link>
      </nav>

      <section className="router-outlet" aria-label="Outlet 결과">
        <p className="eyebrow">Outlet</p>
        <Outlet />
      </section>
    </div>
  );
}

function StartPage() {
  return <h3>위 메뉴를 선택해 route를 이동해보세요.</h3>;
}

function UsersLayout() {
  return <Outlet />;
}

function UsersPage() {
  return (
    <div>
      <h3>사용자 페이지</h3>
      <div className="router-page-links">
        <Link to="42">42번 사용자 상세로 이동</Link>
        <Link to="?page=3">query page=3 적용</Link>
      </div>
    </div>
  );
}

function UserDetailPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h3>{userId}번 사용자 상세 페이지</h3>
      <div className="router-page-links">
        <Link to="..">부모 route인 사용자 목록으로 이동</Link>
        <button type="button" onClick={() => navigate(-1)}>
          실제 이전 방문 기록으로 이동
        </button>
      </div>
    </div>
  );
}

function ProductsPage() {
  return (
    <div>
      <h3>상품 페이지</h3>
      <Link to="/users/42">상품 페이지에서 42번 사용자 상세로 이동</Link>
    </div>
  );
}

function NavigationHistoryPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h3>useNavigate 방문 기록 비교</h3>
      <p>상품 페이지로 이동한 뒤 브라우저의 뒤로 가기를 눌러보세요.</p>
      <div className="button-group">
        <button type="button" onClick={() => navigate("/products")}>
          push로 상품 페이지 이동
        </button>
        <button
          type="button"
          onClick={() => navigate("/products", { replace: true })}
        >
          replace로 상품 페이지 이동
        </button>
      </div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div>
      <h3>404: 페이지를 찾을 수 없습니다.</h3>
      <p>현재 URL과 일치하는 route가 없습니다.</p>
      <Link to="/">첫 화면으로 이동</Link>
    </div>
  );
}

export default function NavLinkExample() {
  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">Router and URL state</p>
        <h2>NavLink 활성 메뉴</h2>
        <p>
          메뉴를 선택한 뒤 URL, 활성 메뉴, Outlet의 화면이 함께 바뀌는지
          확인해보세요.
        </p>
      </div>

      <Routes>
        <Route element={<RouterLayout />}>
          <Route index element={<StartPage />} />
          <Route path="users" element={<UsersLayout />}>
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserDetailPage />} />
          </Route>
          <Route path="products" element={<ProductsPage />} />
          <Route
            path="navigation-history"
            element={<NavigationHistoryPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
}
