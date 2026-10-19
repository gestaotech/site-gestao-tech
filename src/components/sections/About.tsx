import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { institutional } from "@/data/site";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="sobre" className={`section section--soft ${styles.section}`} aria-labelledby="sobre-title">
      <div className="container">
        <SectionHeader
          id="sobre-title"
          eyebrow="Quem somos"
          title="Sobre a Gestão Tech"
          description="Conheça nosso propósito e os princípios que guiam o nosso trabalho."
        />

        <div className={styles.grid}>
          <Reveal className={styles.text}>
            {institutional.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <ul className={styles.values}>
            {institutional.values.map((value) => (
              <li key={value.id}>
                <Reveal className={styles.card}>
                  <h3 className={styles.cardTitle}>{value.title}</h3>
                  <p className={styles.cardText}>{value.text}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
