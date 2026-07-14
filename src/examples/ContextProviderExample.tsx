import { createContext, useContext, useState } from "react";
import StudyCard from "../components/StudyCard";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

type ThemeProps = ThemeContextValue;

const ThemeContext = createContext<ThemeContextValue | null>(null);

function PropsThemeButton({ theme, toggleTheme }: ThemeProps) {
  return (
    <button type="button" onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}

function PropsActionGroup({ theme, toggleTheme }: ThemeProps) {
  return <PropsThemeButton theme={theme} toggleTheme={toggleTheme} />;
}

function PropsToolbar({ theme, toggleTheme }: ThemeProps) {
  return <PropsActionGroup theme={theme} toggleTheme={toggleTheme} />;
}

function ThemeButton() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext 안에서 사용해야 합니다.");
  }

  const { theme, toggleTheme } = themeContext;

  return (
    <button type="button" onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}

function ThemeValue() {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ThemeContext 안에서 사용해야 합니다.");
  }

  return <strong>{themeContext.theme}</strong>;
}

function ActionGroup() {
  return <ThemeButton />;
}

function Toolbar() {
  return (
    <div>
      <p>Toolbar와 ActionGroup은 theme 전달에 관여하지 않습니다.</p>
      <ActionGroup />
    </div>
  );
}

function ContextProviderExample() {
  const [theme, setTheme] = useState<Theme>("dark");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }

  return (
    <div className="example-content">
      <div>
        <p className="eyebrow">09. Context provider scope</p>
        <h2>Context로 전달하는 theme</h2>
        <p>
          Provider 위치에 따라 하위 컴포넌트가 읽는 값을 비교합니다.
        </p>
      </div>

      <div className="key-demo-grid">
        <StudyCard title="props 전달" actions={<code>명시적 전달</code>}>
          <PropsToolbar theme={theme} toggleTheme={toggleTheme} />
        </StudyCard>

        <StudyCard title="Context 전달" actions={<code>useContext</code>}>
          <ThemeContext value={{ theme, toggleTheme }}>
            <Toolbar />
          </ThemeContext>
        </StudyCard>
      </div>

      <ThemeContext value={{ theme, toggleTheme }}>
        <p>
          바깥 Provider 값: <ThemeValue />
        </p>

        <ThemeContext value={{ theme: "light", toggleTheme }}>
          <p>
            안쪽 Provider 값: <ThemeValue />
          </p>
        </ThemeContext>
      </ThemeContext>
    </div>
  );
}

export default ContextProviderExample;
