import type { ReactNode } from "react";

interface StudyCardProps {
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}

function StudyCard({ title, actions, children }: StudyCardProps) {
  return (
    <section className="study-card">
      <header className="study-card-header">
        <h4>{title}</h4>
        {actions && <div className="study-card-actions">{actions}</div>}
      </header>
      {children}
    </section>
  );
}

export default StudyCard;
