import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import styles from "./Services.module.css";

export default function Services() {
  return (
    <section id="servicos" className="section" aria-labelledby="servicos-title">
      <div className="container">
        <SectionHeader
          id="servicos-title"
          eyebrow="O que fazemos"
          title="Nossos serviços"
          description="Soluções completas para organizar, desenvolver e automatizar a tecnologia da sua empresa."
        />

        <ul className={styles.grid}>
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal className={styles.card}>
                <article aria-labelledby={`${service.id}-title`} className={styles.article}>
                  <p className={styles.number}>Serviço {String(index + 1).padStart(2, "0")}</p>
                  <h3 id={`${service.id}-title`} className={styles.title}>
                    {service.title}
                  </h3>
                  <p className={styles.description}>{service.description}</p>
                  {service.items.length > 0 ? (
                    <ul className={styles.items}>
                      {service.items.map((item) => (
                        <li key={item} className={styles.item}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className={styles.benefit}>
                    <strong>Benefício:</strong> {service.benefit}
                  </p>
                  <ButtonLink href="#contato" variant="secondary" className={styles.cta}>
                    {service.cta}
                  </ButtonLink>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
