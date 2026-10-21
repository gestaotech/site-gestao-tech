import Image from "next/image";
import type { CSSProperties } from "react";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { getPublishedSolutions, solutions } from "@/data/solutions";
import styles from "./Solutions.module.css";

export default function Solutions() {
  const published = getPublishedSolutions(solutions);

  return (
    <section id="solucoes" className="section section--soft" aria-labelledby="solucoes-title">
      <div className="container">
        <SectionHeader
          id="solucoes-title"
          eyebrow="Produtos SaaS"
          title="Nossas soluções"
          description="Sistemas prontos para acelerar a gestão do seu negócio, com a qualidade e o suporte da Gestão Tech."
        />

        {published.length === 0 ? (
          <p className={styles.empty}>Novas soluções serão divulgadas em breve.</p>
        ) : (
          <ul className={styles.grid}>
            {published.map((solution) => (
              <li key={solution.id}>
                <Reveal className={styles.card}>
                  <article
                    aria-labelledby={`${solution.id}-title`}
                    className={styles.article}
                    style={{ "--accent": solution.accent } as CSSProperties}
                  >
                    {solution.image ? (
                      <Image
                        src={solution.image.src}
                        alt={solution.image.alt}
                        width={solution.image.width}
                        height={solution.image.height}
                        sizes="(max-width: 768px) 100vw, 380px"
                        className={styles.image}
                      />
                    ) : null}
                    <div className={styles.body}>
                      <div className={styles.accent} aria-hidden="true" />
                      <p className={styles.category}>{solution.category}</p>
                      <h3 id={`${solution.id}-title`} className={styles.title}>
                        {solution.name}
                      </h3>
                      <p className={styles.description}>{solution.description}</p>
                      <ul className={styles.features}>
                        {solution.features.map((feature) => (
                          <li key={feature} className={styles.feature}>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className={styles.footer}>
                        {solution.price ? (
                          <p className={styles.price}>
                            {solution.price.confirmed ? (
                              <>
                                <span className={styles.priceLabel}>{solution.price.label}</span>
                                <span className={styles.priceValue}>{solution.price.value}</span>
                              </>
                            ) : (
                              <span className={styles.priceValue}>Consulte valores</span>
                            )}
                          </p>
                        ) : null}
                        {solution.link ? (
                          <ButtonLink
                            href={solution.link.href}
                            variant="secondary"
                            external
                            className={styles.cta}
                          >
                            {solution.link.label}
                            <span className="visually-hidden"> (abre em nova aba)</span>
                          </ButtonLink>
                        ) : null}
                      </div>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
