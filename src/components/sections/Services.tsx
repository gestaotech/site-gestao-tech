import Image from "next/image";
import { Code, Server, Workflow, type LucideIcon } from "lucide-react";
import ButtonLink from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import { services } from "@/data/services";
import type { ServiceIcon } from "@/data/types";
import styles from "./Services.module.css";

const iconByName: Record<ServiceIcon, LucideIcon> = {
  code: Code,
  server: Server,
  workflow: Workflow,
};

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
          {services.map((service, index) => {
            const Icon = iconByName[service.icon];
            return (
              <li key={service.id}>
                <Reveal className={styles.card}>
                  <article aria-labelledby={`${service.id}-title`} className={styles.article}>
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={service.image.width}
                      height={service.image.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.image}
                    />
                    <div className={styles.body}>
                      <div className={styles.meta}>
                        <span className={styles.iconBox} aria-hidden="true">
                          <Icon size={22} strokeWidth={1.75} />
                        </span>
                        <p className={styles.number}>Serviço {String(index + 1).padStart(2, "0")}</p>
                      </div>
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
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
