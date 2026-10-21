import Image from "next/image";
import { navItems, siteName, tagline } from "@/data/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Image
            src="/images/brand/logo-horizontal.svg"
            alt={siteName}
            width={680}
            height={140}
            unoptimized
            className={styles.logo}
          />
          <p className={styles.tagline}>{tagline}</p>
        </div>

        <nav aria-label="Rodapé">
          <ul className={styles.links}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className={styles.copy}>
          © {year} {siteName}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
