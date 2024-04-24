import Image from "next/image";
import styles from "./page.module.css";
import Test from "@/app/components/test";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1>Home Page</h1>
        <p>Some descriptoin stuff here</p>
      </div>

      <div>
        <Test />
        <ol>
          <li>
            <Link href="/dashboard">Dashboard Page</Link>
          </li>
          <li>
            <Link href="/client">Client Page</Link>
          </li>
          <li>
            <Link href="/distribute">Distribute Page</Link>
          </li>
        </ol>
      </div>
    </main>
  );
}
