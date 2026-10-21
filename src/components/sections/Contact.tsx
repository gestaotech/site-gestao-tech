import { Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import { contact } from "@/data/site";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contato" className="section" aria-labelledby="contato-title">
      <div className="container">
        <SectionHeader
          id="contato-title"
          eyebrow="Fale conosco"
          title="Vamos conversar sobre o seu projeto"
          description="Conte um pouco sobre a sua necessidade. Respondemos pelo WhatsApp no horário de atendimento."
        />

        <div className={styles.grid}>
          <div className={styles.formCard}>
            <ContactForm />
          </div>

          <aside className={styles.info} aria-label="Informações de contato">
            <div className={styles.item}>
              <p className={styles.label}>
                <MessageCircle size={16} strokeWidth={1.75} aria-hidden="true" />
                WhatsApp
              </p>
              <a
                href={`https://wa.me/${contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.value}
              >
                {contact.whatsappDisplay}
              </a>
              <p className={styles.hint}>Atendimento pelo WhatsApp</p>
            </div>

            <div className={styles.item}>
              <p className={styles.label}>
                <Clock size={16} strokeWidth={1.75} aria-hidden="true" />
                Horário de atendimento
              </p>
              <p className={styles.valueText}>{contact.hoursLabel}</p>
              <p className={styles.hint}>{contact.hoursTime}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
