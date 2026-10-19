import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {description ? <p className={styles.description}>{description}</p> : null}
    </header>
  );
}
