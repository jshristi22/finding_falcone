import styles from "./header.module.scss";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.menuContainer}>
        <h5>Reset</h5>|<h5>Geek trust home</h5>
      </div>
      <div className={styles.header}>
        <h1>Finding Falcone</h1>
      </div>
    </div>
  );
}
