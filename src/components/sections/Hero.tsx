import ButtonLink from "@/components/ui/Button";
import styles from "./Hero.module.css";

const focusAreas = [
  { label: "Desenvolvimento web", href: "#servicos", note: "Sites e sistemas sob medida" },
  { label: "Sistemas de gestão", href: "#solucoes", note: "Soluções prontas para o dia a dia" },
  { label: "Automação de processos", href: "#servicos", note: "Menos tarefas manuais" },
  { label: "Gestão de TI", href: "#servicos", note: "Infraestrutura e planejamento" },
];

export default function Hero() {
  return (
    <section id="home" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.badge}>Software House</p>
          <h1 id="hero-title" className={styles.title}>
            Tecnologia que <span className={styles.highlight}>gera resultados.</span>
          </h1>
          <p className={styles.subtitle}>
            A Gestão Tech desenvolve sites, sistemas web e soluções de gestão que
            ajudam empresas a organizar processos, automatizar tarefas e crescer
            com tecnologia.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="#contato">Fale com a Gestão Tech</ButtonLink>
            <ButtonLink href="#solucoes" variant="secondary">
              Conheça nossas soluções
            </ButtonLink>
          </div>
        </div>

        <aside className={styles.panel} aria-labelledby="focus-title">
          <h2 id="focus-title" className={styles.panelTitle}>
            Como podemos ajudar
          </h2>
          <ul className={styles.list}>
            {focusAreas.map((area, index) => (
              <li key={area.label}>
                <a href={area.href} className={styles.item}>
                  <span className={styles.index} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.itemText}>
                    <strong>{area.label}</strong>
                    <span>{area.note}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
