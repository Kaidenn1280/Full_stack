// src/components/SkillCard.tsx
type SkillCardProps = {
  title: string;
  summary: string;
  level?: string;
};

const SkillCard = ({ title, summary, level }: SkillCardProps) => {
  return (
    <div className="skill-card">
      <h3>{title}</h3>
      {level && <p className="skill-card-level">{level}</p>}
      <p>{summary}</p>
    </div>
  );
};

export default SkillCard;
