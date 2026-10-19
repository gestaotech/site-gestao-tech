import type { Metadata } from "next";
import ButtonLink from "@/components/ui/Button";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

export default function NotFound() {
  return (
    <main className={styles.main}>
      <div className="container">
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Página não encontrada</h1>
        <p className={styles.text}>O endereço que você acessou não existe ou foi movido.</p>
        <ButtonLink href="/">Voltar ao início</ButtonLink>
      </div>
    </main>
  );
}
